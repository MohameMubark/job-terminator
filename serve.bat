@echo off
REM Temporary foreground server (console visible, Ctrl+C to stop).
REM Serves this folder on port 8093 so phones on the same Wi-Fi can preview it.
cd /d "%~dp0"
echo.
echo   Job Terminator site running from: %~dp0
echo   This PC : http://localhost:8093
echo   LAN     : http://[your-lan-ip]:8093   (same Wi-Fi)
echo   Stop    : Ctrl+C
echo.
python -m http.server 8093 --bind 0.0.0.0
if errorlevel 1 (
  echo.
  echo Python was not found on PATH. Install Python 3, or edit this file and put
  echo the full path to python.exe in the line above.
  pause
)
