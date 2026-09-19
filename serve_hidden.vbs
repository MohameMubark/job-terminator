' Background launcher: serves this folder on port 8093 with no visible window.
' Paths are relative to this file, so the folder can be moved freely.
Dim sh, fso, here
Set sh  = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")
here = fso.GetParentFolderName(WScript.ScriptFullName)
sh.CurrentDirectory = here
sh.Run "python -m http.server 8093 --bind 0.0.0.0", 0, False
