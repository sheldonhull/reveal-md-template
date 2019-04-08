
[scriptblock]$Command = {
    $WorkingDirectory = ($PSScriptRoot,$PWD -ne $null)[0]
    start-process powershell.exe -argumentlist ("reveal-md `"presentation.md`" --static _site") -WorkingDirectory $WorkingDirectory
}

[string]$CommandString = [string]::Concat($Command.ToString())
$bytes = [System.Text.Encoding]::Unicode.GetBytes($CommandString)
$encodedCommand = [Convert]::ToBase64String($bytes)
$decodedCommand = [System.Text.Encoding]::Unicode.GetString([System.Convert]::FromBase64String($encodedCommand));
Write-PSFMessage -Level Debug -Message "Decoded Command: $($DecodedCommand)"
PowerShell.exe -NoProfile -Command "& {Start-Process PowerShell.exe -ArgumentList '-NoProfile -ExecutionPolicy Bypass -EncodedCommand $encodedCommand'}"
exit
