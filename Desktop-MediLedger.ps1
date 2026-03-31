$ErrorActionPreference = "Stop"
$launcherVersion = "Desktop launcher v2"

$appRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$stateDir = Join-Path $env:LOCALAPPDATA "MediLedgerDesktop"
$null = New-Item -ItemType Directory -Path $stateDir -Force
$sessionFile = Join-Path $stateDir "session.json"
$portFile = Join-Path $stateDir "server-url.txt"
$logFile = Join-Path $stateDir "launcher-error.log"
$mutexName = "Local\MediLedgerDesktopSingleInstance"

Add-Type -AssemblyName System.Windows.Forms
Add-Type @"
using System;
using System.Runtime.InteropServices;
public static class WinApi {
  [DllImport("user32.dll")] public static extern bool ShowWindowAsync(IntPtr hWnd, int nCmdShow);
  [DllImport("user32.dll")] public static extern bool SetForegroundWindow(IntPtr hWnd);
}
"@

function Focus-ExistingWindow {
  param([int] $ProcessId)

  try {
    $process = Get-Process -Id $ProcessId -ErrorAction Stop
    if ($process.MainWindowHandle -ne 0) {
      [WinApi]::ShowWindowAsync($process.MainWindowHandle, 9) | Out-Null
      [WinApi]::SetForegroundWindow($process.MainWindowHandle) | Out-Null
      return $true
    }
  } catch {}

  return $false
}

function Get-WebViewExecutable {
  $base = "C:\Program Files (x86)\Microsoft\EdgeWebView\Application"
  $versionDir = Get-ChildItem $base -Directory -ErrorAction SilentlyContinue |
    Where-Object { $_.Name -match '^\d+\.\d+\.\d+\.\d+$' } |
    Sort-Object Name -Descending |
    Select-Object -First 1

  if (-not $versionDir) {
    throw "WebView2 runtime was not found."
  }

  $exe = Join-Path $versionDir.FullName "msedgewebview2.exe"
  if (-not (Test-Path $exe)) {
    throw "WebView2 executable was not found."
  }

  return $exe
}

function Wait-ForProcessExitIfRunning {
  param([int] $ProcessId)

  while ($true) {
    try {
      $process = Get-Process -Id $ProcessId -ErrorAction Stop
      Start-Sleep -Milliseconds 500
    } catch {
      break
    }
  }
}

function Write-LauncherLog {
  param([string] $Message)
  Add-Content -Path $logFile -Value $Message -Encoding UTF8
}

try {
  Set-Content -Path $logFile -Value "$launcherVersion`r`nStarted: $(Get-Date -Format o)" -Encoding UTF8
  $createdNew = $false
  $mutex = New-Object System.Threading.Mutex($true, $mutexName, [ref] $createdNew)
  Write-LauncherLog "Mutex createdNew: $createdNew"

  if (-not $createdNew) {
    Write-LauncherLog "Another launcher instance was detected."
    if (Test-Path $sessionFile) {
      try {
        $session = Get-Content $sessionFile | ConvertFrom-Json
        Write-LauncherLog "Session file found. AppPid: $($session.AppPid) ServerPid: $($session.ServerPid) Url: $($session.Url)"
        if ($session.AppPid -and (Focus-ExistingWindow -ProcessId ([int] $session.AppPid))) {
          Write-LauncherLog "Focused existing app window."
          exit 0
        }
      } catch {}
    }

    Write-LauncherLog "Could not focus an existing window. Exiting because mutex is already held."
    [System.Windows.Forms.MessageBox]::Show(
      "MediLedger thinks another copy is already running, but it could not bring that window forward.`r`n`r`nTry closing any hidden MediLedger or WebView windows and run it again.",
      "MediLedger Already Running",
      [System.Windows.Forms.MessageBoxButtons]::OK,
      [System.Windows.Forms.MessageBoxIcon]::Warning
    ) | Out-Null
    exit 0
  }

  if (Test-Path $portFile) { Remove-Item $portFile -Force }
  Write-LauncherLog "Starting local server..."

  $serverScript = Join-Path $appRoot "Start-MediLedger.ps1"
  $serverProcess = Start-Process powershell.exe -ArgumentList @(
    "-NoProfile",
    "-ExecutionPolicy", "Bypass",
    "-WindowStyle", "Hidden",
    "-File", "`"$serverScript`"",
    "-NoBrowser",
    "-PortFile", "`"$portFile`""
  ) -PassThru -WindowStyle Hidden
  Write-LauncherLog "Server process started: $($serverProcess.Id)"

  $deadline = (Get-Date).AddSeconds(10)
  while ((Get-Date) -lt $deadline -and -not (Test-Path $portFile)) {
    Start-Sleep -Milliseconds 200
  }

  if (-not (Test-Path $portFile)) {
    throw "The local MediLedger server did not start in time."
  }

  $url = (Get-Content $portFile -Raw).Trim()
  $webViewExe = Get-WebViewExecutable
  $userDataDir = Join-Path $stateDir "webview-data"
  Write-LauncherLog "Server URL: $url"
  Write-LauncherLog "WebView executable: $webViewExe"

  $appProcess = Start-Process $webViewExe -ArgumentList @(
    "--app=$url",
    "--user-data-dir=$userDataDir",
    "--window-size=1400,920"
  ) -PassThru
  Write-LauncherLog "Started WebView process: $($appProcess.Id)"

  Start-Sleep -Seconds 2
  $desktopProcessAlive = $true
  try {
    Get-Process -Id $appProcess.Id -ErrorAction Stop | Out-Null
  } catch {
    $desktopProcessAlive = $false
  }

  if (-not $desktopProcessAlive) {
    Write-LauncherLog "WebView process exited immediately. Falling back to browser."
    Start-Process $url
    return
  }

  @{
    AppPid = $appProcess.Id
    ServerPid = $serverProcess.Id
    Url = $url
  } | ConvertTo-Json | Set-Content -Path $sessionFile -Encoding UTF8

  Wait-ForProcessExitIfRunning -ProcessId $appProcess.Id
} catch {
  $message = $_ | Out-String
  Set-Content -Path $logFile -Value $message -Encoding UTF8
  [System.Windows.Forms.MessageBox]::Show(
    "MediLedger could not start.`r`n`r`n$message`r`nLog: $logFile",
    "MediLedger Launcher Error",
    [System.Windows.Forms.MessageBoxButtons]::OK,
    [System.Windows.Forms.MessageBoxIcon]::Error
  ) | Out-Null
} finally {
  if (Test-Path $sessionFile) { Remove-Item $sessionFile -Force -ErrorAction SilentlyContinue }
  if (Test-Path $portFile) { Remove-Item $portFile -Force -ErrorAction SilentlyContinue }

  try {
    if ($serverProcess -and -not $serverProcess.HasExited) {
      Stop-Process -Id $serverProcess.Id -Force
    }
  } catch {}

  try {
    if ($mutex) {
      $mutex.ReleaseMutex() | Out-Null
      $mutex.Dispose()
    }
  } catch {}
}
