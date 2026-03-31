@echo off
setlocal
title MediLedger Server

set "APP_DIR=%~dp0"
set "NODE_EXE=node"
set "NPM_CMD=npm"

if exist "C:\Program Files\nodejs\node.exe" set "NODE_EXE=C:\Program Files\nodejs\node.exe"
if exist "C:\Program Files\nodejs\npm.cmd" set "NPM_CMD=C:\Program Files\nodejs\npm.cmd"

echo Starting MediLedger...
echo.

if not exist "%APP_DIR%node_modules" (
  echo Installing dependencies...
  set "npm_config_cache=%APP_DIR%.npm-cache"
  call "%NPM_CMD%" install
  if errorlevel 1 (
    echo.
    echo Failed to install dependencies.
    echo Keep this window open and check the error above.
    pause
    exit /b 1
  )
  echo.
)

echo MediLedger will run at http://localhost:3000
echo Keep this window open while using the app.
echo.
start "" http://localhost:3000
call "%NPM_CMD%" start
