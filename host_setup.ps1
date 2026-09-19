# Permanent hosting setup (run via host_install.bat as administrator).
# Paths are derived from this script's location, so the folder can be moved.
$SiteDir = $PSScriptRoot
$Port    = 8093

$lnk = "$env:APPDATA\Microsoft\Windows\Start Menu\Programs\Startup\JobTerminatorSite.lnk"
$s = (New-Object -ComObject WScript.Shell).CreateShortcut($lnk)
$s.TargetPath       = "wscript.exe"
$s.Arguments        = '"' + $SiteDir + '\serve_hidden.vbs"'
$s.WorkingDirectory = $SiteDir
$s.Save()
Write-Output "Startup shortcut created -> $lnk"

netsh advfirewall firewall delete rule name="JobTerminatorSite" 2>$null | Out-Null
netsh advfirewall firewall add rule name="JobTerminatorSite" dir=in action=allow protocol=TCP localport=$Port | Out-Null
Write-Output "Firewall rule added for TCP $Port."
