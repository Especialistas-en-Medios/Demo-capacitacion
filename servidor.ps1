# =========================================================================
# Mini Servidor Web Nativo en PowerShell (No requiere Python ni Node.js)
# =========================================================================

$port = 8080
$rootPath = $PSScriptRoot
if (-not $rootPath) { $rootPath = Get-Location }

# Mapa de tipos MIME comunes
$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".htm"  = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".gif"  = "image/gif"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
}

# Inicializar HttpListener
$listener = New-Object System.Net.HttpListener
$url = "http://localhost:$port/"
$listener.Prefixes.Add($url)

try {
    $listener.Start()
} catch {
    # Si el puerto 8080 está ocupado, probar con 8081
    $port = 8081
    $url = "http://localhost:$port/"
    $listener = New-Object System.Net.HttpListener
    $listener.Prefixes.Add($url)
    $listener.Start()
}

Write-Host ""
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "   SERVIDOR LOCAL DE CAPACITACION GIT & GITHUB" -ForegroundColor Yellow
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " Servidor iniciado en: $url" -ForegroundColor Green
Write-Host " Carpeta compartida:   $rootPath" -ForegroundColor Gray
Write-Host " Presiona Ctrl + C en esta ventana para detener el servidor." -ForegroundColor DarkYellow
Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host ""

# Abrir el navegador automáticamente
Start-Process $url

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        # Obtener ruta local relativa
        $localPath = $request.Url.LocalPath.TrimStart('/')
        if ([string]::IsNullOrWhiteSpace($localPath) -or $localPath -eq "/") {
            $localPath = "index.html"
        }

        # Decodificar URL y resolver ruta en el sistema
        $decodedPath = [System.Uri]::UnescapeDataString($localPath).Replace('/', [System.IO.Path]::DirectorySeparatorChar)
        $filePath = [System.IO.Path]::Combine($rootPath, $decodedPath)

        if ([System.IO.File]::Exists($filePath)) {
            $extension = [System.IO.Path]::GetExtension($filePath).ToLower()
            $mimeType = $mimeTypes[$extension]
            if (-not $mimeType) { $mimeType = "application/octet-stream" }

            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            $response.ContentType = $mimeType
            $response.ContentLength64 = $bytes.Length
            $response.StatusCode = 200
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
            Write-Host "[200 OK] $localPath" -ForegroundColor Green
        } else {
            $response.StatusCode = 404
            $errBytes = [System.Text.Encoding]::UTF8.GetBytes("404 - Archivo no encontrado: $localPath")
            $response.ContentLength64 = $errBytes.Length
            $response.ContentType = "text/plain; charset=utf-8"
            $response.OutputStream.Write($errBytes, 0, $errBytes.Length)
            Write-Host "[404 Not Found] $localPath" -ForegroundColor Red
        }

        $response.Close()
    }
} finally {
    $listener.Stop()
    $listener.Close()
}
