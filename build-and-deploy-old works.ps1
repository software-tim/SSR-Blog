# SSR-Blog Build and Deploy Script
# Automates the complete Azure deployment process

param(
    [string]$CommitMessage = "Auto-deploy: Fix entry.mjs paths and environment variables for Azure"
)

Write-Host "🚀 Starting SSR-Blog Azure Deployment Process..." -ForegroundColor Green
Write-Host ""

# Step 1: Clear build cache
Write-Host "📂 Step 1: Clearing build cache..." -ForegroundColor Yellow
if (Test-Path ".astro") {
    Remove-Item -Recurse -Force .astro
    Write-Host "✅ Cleared .astro cache" -ForegroundColor Green
} else {
    Write-Host "ℹ️  No .astro cache found" -ForegroundColor Cyan
}

# Also clear previous build outputs
if (Test-Path "server") {
    Remove-Item -Recurse -Force server
    Write-Host "✅ Cleared server directory" -ForegroundColor Green
}

if (Test-Path "client") {
    Remove-Item -Recurse -Force client
    Write-Host "✅ Cleared client directory" -ForegroundColor Green
}

Write-Host ""

# Step 2: Build the project
Write-Host "🔨 Step 2: Building project..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed! Check the output above." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build completed successfully" -ForegroundColor Green
Write-Host ""

# Step 3: Fix entry.mjs
Write-Host "🔧 Step 3: Fixing entry.mjs for Azure..." -ForegroundColor Yellow

$entryPath = "server/entry.mjs"
if (Test-Path $entryPath) {
    # Read the file content
    $content = Get-Content $entryPath -Raw
    
    # Check if it needs fixing (contains hardcoded paths)
    if ($content -match 'file:///.*project/(client|server)/' -or $content -match '"port":\s*8080' -and $content -notmatch 'process\.env\.PORT') {
        Write-Host "🔍 Found hardcoded paths/ports in entry.mjs, fixing..." -ForegroundColor Cyan
        
        # Fix the _args section
        $fixedContent = $content -replace 'file:///[^"]*project/client/', './client/'
        $fixedContent = $fixedContent -replace 'file:///[^"]*project/server/', './server/'
        $fixedContent = $fixedContent -replace '"host":\s*"[^"]*"', '"host": process.env.HOST || "0.0.0.0"'
        $fixedContent = $fixedContent -replace '"port":\s*8080', '"port": parseInt(process.env.PORT) || 8080'
        
        # Write the fixed content back
        $fixedContent | Set-Content $entryPath -NoNewline
        
        Write-Host "✅ Fixed entry.mjs paths and environment variables" -ForegroundColor Green
    } else {
        Write-Host "✅ entry.mjs already has correct configuration" -ForegroundColor Green
    }
} else {
    Write-Host "❌ entry.mjs not found at $entryPath" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Step 4: Git operations
Write-Host "📤 Step 4: Deploying to GitHub..." -ForegroundColor Yellow

# Check git status
Write-Host "🔍 Checking git status..." -ForegroundColor Cyan
git status --porcelain

# Add all changes
Write-Host "➕ Adding all changes..." -ForegroundColor Cyan
git add .

# Commit changes
Write-Host "💾 Committing changes..." -ForegroundColor Cyan
git commit -m "$CommitMessage"

if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  No changes to commit or commit failed" -ForegroundColor Yellow
} else {
    Write-Host "✅ Changes committed successfully" -ForegroundColor Green
}

# Push to GitHub
Write-Host "🚀 Pushing to GitHub..." -ForegroundColor Cyan
git push origin main

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Push failed! Check your network connection and GitHub access." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Successfully pushed to GitHub" -ForegroundColor Green
Write-Host ""

# Final success message
Write-Host "🎉 Deployment Process Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Go to GitHub Actions to monitor the deployment"
Write-Host "2. Visit your Azure site once deployment completes"
Write-Host "3. Check that the site is working correctly"
Write-Host ""
Write-Host "GitHub Actions: https://github.com/software-tim/SSR-Blog/actions" -ForegroundColor Blue
Write-Host "Azure Site: https://ssr-blog-g3g4hcg6ffhvchfg.centralus-01.azurewebsites.net" -ForegroundColor Blue