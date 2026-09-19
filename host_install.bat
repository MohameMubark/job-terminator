@echo off
REM Permanent hosting: auto-start on Windows logon + open the firewall port.
REM Right-click -^> "Run as administrator" (needed for the firewall rule).
net session >nul 2>&1
if %errorlevel% neq 0 (
  echo Requesting administrator rights...
  powershell -Command "Start-Process '%~f0' -Verb RunAs"
  exit /b
)
cd /d "%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0host_setup.ps1"
wscript.exe "%~dp0serve_hidden.vbs"
echo.
echo Done. The site is live at:
echo   This PC : http://localhost:8093
echo   LAN     : http://[your-lan-ip]:8093
echo It will also start automatically on every Windows login.
pause
