# build-and-package.ps1

# Set working directories
$projectRoot = "$PSScriptRoot"
$distFolder = "$projectRoot\dist"
$zipFile = "$projectRoot\deploy.zip"

# Clean old zip
if (Test-Path $zipFile) {
    Remove-Item $zipFile -Force
}

# Remove any old client/server folders in root (from previous builds)
@("client", "server") | ForEach-Object {
    $folderPath = Join-Path $projectRoot $_
    if (Test-Path $folderPath) {
        Remove-Item -Recurse -Force $folderPath
    }
}

# Run Astro build
Write-Host "`nBuilding Astro SSR project..."
npm run build

# Verify entry.mjs was built
if (!(Test-Path "$distFolder\server\entry.mjs")) {
    Write-Error "Build failed or missing entry.mjs in dist/server"
    exit 1
}

# Move output from dist to project root (needed for clean ZIP structure)
if (Test-Path "$distFolder\client") {
    Move-Item -Path "$distFolder\client" -Destination "$projectRoot\client" -Force
}
if (Test-Path "$distFolder\server") {
    Move-Item -Path "$distFolder\server" -Destination "$projectRoot\server" -Force
}

# Confirm entry.mjs now exists at root-level server/
if (!(Test-Path "$projectRoot\server\entry.mjs")) {
    Write-Error "entry.mjs is missing after move. Deployment will fail."
    exit 1
}

# Create deploy.zip
Write-Host "Compressing project files..."
Compress-Archive -Path @(
    "$projectRoot\client",
    "$projectRoot\server",
    "$projectRoot\astro.config.mjs",
    "$projectRoot\package.json",
    "$projectRoot\server.mjs",
    "$projectRoot\node_modules"
) -DestinationPath $zipFile -Force

Write-Host "`n✅ Done. Zip created at $zipFile"
