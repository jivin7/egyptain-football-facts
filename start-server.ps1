# Simple static file server for Egyptian Football Facts (port 8080)
$port = 8080
$root = $PSScriptRoot
$prefix = "http://localhost:$port/"

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)
$listener.Start()

Write-Host "Serving $root"
Write-Host "Open: $prefix"
Write-Host "Press Ctrl+C to stop."

$mime = @{
  '.html' = 'text/html; charset=utf-8'
  '.css'  = 'text/css; charset=utf-8'
  '.js'   = 'application/javascript; charset=utf-8'
  '.json' = 'application/json; charset=utf-8'
  '.png'  = 'image/png'
  '.jpg'  = 'image/jpeg'
  '.jpeg' = 'image/jpeg'
  '.gif'  = 'image/gif'
  '.svg'  = 'image/svg+xml'
  '.mp4'  = 'video/mp4'
  '.webp' = 'image/webp'
  '.ico'  = 'image/x-icon'
}

function Get-LocalPath([string]$url) {
  $path = [System.Uri]::UnescapeDataString($url.LocalPath.TrimStart('/'))
  if ([string]::IsNullOrWhiteSpace($path)) { $path = 'index.html' }
  $full = Join-Path $root ($path -replace '/', [IO.Path]::DirectorySeparatorChar)
  if (Test-Path $full -PathType Container) {
    $full = Join-Path $full 'index.html'
  }
  return $full
}

try {
  while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response

    try {
      $local = Get-LocalPath $request.Url
      if (-not (Test-Path $local -PathType Leaf)) {
        $response.StatusCode = 404
        $bytes = [Text.Encoding]::UTF8.GetBytes('404 Not Found')
        $response.OutputStream.Write($bytes, 0, $bytes.Length)
      } else {
        $ext = [IO.Path]::GetExtension($local).ToLowerInvariant()
        if ($mime.ContainsKey($ext)) {
          $response.ContentType = $mime[$ext]
        }
        $bytes = [IO.File]::ReadAllBytes($local)
        $response.ContentLength64 = $bytes.Length
        $response.OutputStream.Write($bytes, 0, $bytes.Length)
      }
    } catch {
      $response.StatusCode = 500
    } finally {
      $response.Close()
    }
  }
} finally {
  $listener.Stop()
}
