$path = 'C:\Users\jjayd\.cursor\projects\c-Users-jjayd-OneDrive-Pictures-setion-1\agent-transcripts\c3fe5b5b-8bfc-411e-ba51-1de4ff9eb46f\c3fe5b5b-8bfc-411e-ba51-1de4ff9eb46f.jsonl'
$best = $null
$bestLen = 0
Get-Content $path | ForEach-Object {
  try {
    $o = $_ | ConvertFrom-Json
    foreach ($p in $o.message.content) {
      if ($p.type -eq 'tool_use' -and $p.name -eq 'Write' -and $p.input.path -like '*app.js') {
        $len = $p.input.contents.Length
        if ($len -gt $bestLen) {
          $bestLen = $len
          $best = $p.input.contents
        }
      }
    }
  } catch {}
}
if ($best) {
  $out = 'c:\Users\jjayd\OneDrive\Pictures\setion 1\app-from-transcript.js'
  [IO.File]::WriteAllText($out, $best, [Text.UTF8Encoding]::new($false))
  Write-Host "Wrote $bestLen chars to $out"
} else {
  Write-Host 'Not found'
}
