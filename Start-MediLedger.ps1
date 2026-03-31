param(
  [switch] $NoBrowser,
  [string] $PortFile = "",
  [string] $HostName = "127.0.0.1",
  [int] $StartPort = 4173
)

$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$preferredPort = $StartPort

$mimeTypes = @{
  ".html" = "text/html; charset=utf-8"
  ".css" = "text/css; charset=utf-8"
  ".js" = "application/javascript; charset=utf-8"
  ".json" = "application/json; charset=utf-8"
  ".svg" = "image/svg+xml"
  ".png" = "image/png"
  ".txt" = "text/plain; charset=utf-8"
}

function Send-Response {
  param(
    [Parameter(Mandatory = $true)] $Client,
    [int] $StatusCode,
    [string] $StatusText,
    [byte[]] $Body,
    [string] $ContentType = "text/plain; charset=utf-8"
  )

  $stream = $Client.GetStream()
  $writer = New-Object System.IO.StreamWriter($stream, [System.Text.Encoding]::ASCII, 1024, $true)
  $writer.NewLine = "`r`n"
  $writer.WriteLine("HTTP/1.1 $StatusCode $StatusText")
  $writer.WriteLine("Content-Type: $ContentType")
  $writer.WriteLine("Content-Length: $($Body.Length)")
  $writer.WriteLine("Cache-Control: no-store")
  $writer.WriteLine("Connection: close")
  $writer.WriteLine()
  $writer.Flush()
  $stream.Write($Body, 0, $Body.Length)
  $stream.Flush()
  $writer.Dispose()
  $stream.Dispose()
  $Client.Close()
}

$listener = $null
$port = $null

foreach ($candidatePort in @($preferredPort) + (($preferredPort + 1)..($preferredPort + 20))) {
  try {
    $candidate = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Parse($HostName), $candidatePort)
    $candidate.Start()
    $listener = $candidate
    $port = $candidatePort
    break
  } catch {
    if ($candidate) {
      try { $candidate.Stop() } catch {}
    }
  }
}

if (-not $listener) {
  throw "Could not start the local MediLedger server on ports $preferredPort-$($preferredPort + 20)."
}

$url = "http://${HostName}:${port}/"

if ($PortFile) {
  Set-Content -Path $PortFile -Value $url -Encoding UTF8
}

Write-Host "MediLedger running at $url"
Write-Host "Keep this window open while using the app."
if (-not $NoBrowser) {
  try {
    Start-Process $url
  } catch {
    Write-Host "Open this URL in your browser: $url"
  }
}

try {
  while ($true) {
    $client = $listener.AcceptTcpClient()

    try {
      $stream = $client.GetStream()
      $reader = New-Object System.IO.StreamReader($stream, [System.Text.Encoding]::ASCII, $false, 1024, $true)
      $requestLine = $reader.ReadLine()

      if ([string]::IsNullOrWhiteSpace($requestLine)) {
        $reader.Dispose()
        $stream.Dispose()
        $client.Close()
        continue
      }

      do {
        $headerLine = $reader.ReadLine()
      } while ($headerLine -ne "")

      $reader.Dispose()

      $parts = $requestLine.Split(" ")
      $method = $parts[0]
      $path = if ($parts.Length -gt 1) { $parts[1] } else { "/" }

      if ($method -ne "GET") {
        $body = [System.Text.Encoding]::UTF8.GetBytes("Method Not Allowed")
        Send-Response -Client $client -StatusCode 405 -StatusText "Method Not Allowed" -Body $body
        continue
      }

      $relativePath = $path.Split("?")[0].TrimStart("/")
      if ([string]::IsNullOrWhiteSpace($relativePath)) {
        $relativePath = "index.html"
      }

      $relativePath = $relativePath -replace "/", "\"
      $safePath = [IO.Path]::GetFullPath((Join-Path $root $relativePath))

      if (-not $safePath.StartsWith($root, [System.StringComparison]::OrdinalIgnoreCase) -or -not (Test-Path $safePath -PathType Leaf)) {
        $body = [System.Text.Encoding]::UTF8.GetBytes("Not Found")
        Send-Response -Client $client -StatusCode 404 -StatusText "Not Found" -Body $body
        continue
      }

      $extension = [IO.Path]::GetExtension($safePath).ToLowerInvariant()
      $contentType = $mimeTypes[$extension]
      if (-not $contentType) {
        $contentType = "application/octet-stream"
      }

      $body = [IO.File]::ReadAllBytes($safePath)
      Send-Response -Client $client -StatusCode 200 -StatusText "OK" -Body $body -ContentType $contentType
    } catch {
      try {
        $body = [System.Text.Encoding]::UTF8.GetBytes("Internal Server Error")
        Send-Response -Client $client -StatusCode 500 -StatusText "Internal Server Error" -Body $body
      } catch {
        $client.Close()
      }
    }
  }
} finally {
  $listener.Stop()
}
