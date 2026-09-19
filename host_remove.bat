@echo off
REM Stop permanent hosting: remove the logon shortcut, firewall rule and server.
net session >nul 2>&1
if %errorlevel% neq 0 (
  echo Requesting administrator rights...
  powershell -Command "Start-Process '%~f0' -Verb RunAs"
  exit /b
)
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0host_teardown.ps1"
echo Hosting removed.
pause
