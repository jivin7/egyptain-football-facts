$src = 'c:\Users\jjayd\OneDrive\Pictures\setion 1\app.js.bak'
if (-not (Test-Path $src)) {
  Copy-Item 'c:\Users\jjayd\OneDrive\Pictures\setion 1\app.js' $src -Force
}
$raw = [System.IO.File]::ReadAllText($src)

function Fix-SpaceMarkers([string]$s) {
  $t = $s
  $t = [regex]::Replace($t, '(?<=[\{\(\[,;:=\>\-\+\*\/\&\|\!\?\.\}\)\]])a+(?=\S)', ' ')
  $t = [regex]::Replace($t, 'a+(?=[A-Z_$`''"])', ' ')
  $t = [regex]::Replace($t, 'a+(?=[=\*\+\-,;\)\}])', ' ')
  $t = [regex]::Replace($t, '(?<=[=\*\+\-,;\(\{])a+', ' ')
  $t = [regex]::Replace($t, '(?<=\d)a+(?=[A-Za-z_$''"`\*])', ' ')
  $t = [regex]::Replace($t, '(?<=[a-z])a+(?=[A-Z])', ' ')
  $t = [regex]::Replace($t, '(?<=\s)a+(?=\S)', ' ')
  $t = [regex]::Replace($t, '\s{2,}', ' ')
  return $t
}

function Fix-TCorruption([string]$s) {
  $t = $s.Replace('>', '-')
  $t = Fix-SpaceMarkers $t

  $hhFixes = [ordered]@{
    'hhe' = 'the'
    'hhat' = 'that'
    'hhis' = 'this'
    'hhen' = 'then'
    'hheir' = 'their'
    'hhem' = 'them'
    'hhere' = 'there'
    'hhrough' = 'through'
    'hhree' = 'three'
    'hhough' = 'though'
  }
  foreach ($k in $hhFixes.Keys) { $t = $t.Replace($k, $hhFixes[$k]) }

  $t = $t.Replace('h', 't')
  $t = $t.Replace('tttps', 'https')
  $t = $t.Replace('atly', 'ahly')
  $t = $t.Replace('Atly', 'Ahly')
  return $t
}

$decoded = Fix-TCorruption $raw
$dst = 'c:\Users\jjayd\OneDrive\Pictures\setion 1\app.js'
[System.IO.File]::WriteAllText($dst, $decoded, [System.Text.UTF8Encoding]::new($false))
$bad = Select-String -Path $dst -Pattern '[^a-zA-Z]a[^a-zA-Z]|^a[^a-zA-Z]' -AllMatches | Select-Object -First 5
Write-Host "Lines:" (($decoded -split "`n").Count)
Write-Host "loadEgyptTeams:" ($decoded.Contains('loadEgyptTeams'))
Write-Host "fetchFromApi:" ($decoded.Contains('fetchFromApi'))
Write-Host "apiFetch:" ($decoded.Contains('apiFetch'))
if ($bad) { Write-Host "Possible leftover a-markers:" ; $bad | ForEach-Object { $_.Line } }
