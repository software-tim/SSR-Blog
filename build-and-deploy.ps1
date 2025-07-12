param(
    [string]$CommitMessage = "Auto-deploy: Fix entry.mjs paths"
)

Write-Host "Starting SSR-Blog Deployment..." -ForegroundColor Green
Write-Host ""

# Clear build artifacts
if (Test-Path ".astro") { Remove-Item -Recurse -Force .astro }
if (Test-Path "server") { Remove-Item -Recurse -Force server }
if (Test-Path "client") { Remove-Item -Recurse -Force client }

# Build project
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed." -ForegroundColor Red
    exit 1
}
Write-Host "Build succeeded." -ForegroundColor Green

# Patch entry.mjs
$entryPath = "server/entry.mjs"
if (Test-Path $entryPath) {
    $content = Get-Content $entryPath -Raw
    $fixed = $content `
        -replace 'const \*page', 'const _page' `
        -replace 'const \*exports', 'const _exports' `
        -replace 'const \*manifest', 'const _manifest' `
        -replace 'const \*args', 'const _args' `
        -replace 'const \*start', 'const _start' `
        -replace '_page0\]', '_page0]' `
        -replace '\*page(\d+)', '_page$1' `
        -replace 'file:///[^"]*/(client|server)/', './$1/' `
        -replace '"host":\s*"[^"]*"', '"host": "0.0.0.0"' `
        -replace '"port":\s*8080', '"port": 8080'
    $fixed | Set-Content $entryPath -NoNewline
    Write-Host "entry.mjs patched." -ForegroundColor Green
} else {
    Write-Host "entry.mjs not found." -ForegroundColor Red
    exit 1
}

# Git operations
git status --porcelain
git add .
git commit -m "$CommitMessage"
if ($LASTEXITCODE -ne 0) {
    Write-Host "No changes to commit." -ForegroundColor Yellow
} else {
    Write-Host "Committed changes." -ForegroundColor Green
}

git push origin main
if ($LASTEXITCODE -ne 0) {
    Write-Host "Git push failed." -ForegroundColor Red
    exit 1
}

Write-Host "Deployment complete." -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "  View GitHub Actions log:"
Write-Host "    https://github.com/software-tim/SSR-Blog/actions"
Write-Host "  View your Azure site:"
Write-Host "    https://ssr-blog.azurewebsites.net"

