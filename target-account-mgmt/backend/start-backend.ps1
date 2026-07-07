# Target Account Management - Start Backend Server
# PowerShell script to start backend with auto-migration

Write-Host "=" * 60
Write-Host "Target Account Management - Backend Server"
Write-Host "=" * 60
Write-Host ""

# Check if in correct directory
if (-not (Test-Path "./src/server.ts")) {
    Write-Host "[ERROR] Please run this script from the backend directory"
    Write-Host "Usage: cd backend; .\start-backend.ps1"
    exit 1
}

Write-Host "[1/3] Checking dependencies..."
if (-not (Test-Path "./node_modules")) {
    Write-Host "[2/3] Installing dependencies..."
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[ERROR] npm install failed"
        exit 1
    }
    Write-Host "[OK] Dependencies installed"
}

Write-Host "[2/3] Running database migrations..."
npm run migrate
if ($LASTEXITCODE -ne 0) {
    Write-Host "[WARNING] Migration had an error (might be okay if tables exist)"
}

Write-Host "[3/3] Starting backend server..."
Write-Host ""
Write-Host "Backend API: http://localhost:3001"
Write-Host "Health Check: http://localhost:3001/health"
Write-Host ""
Write-Host "Press Ctrl+C to stop"
Write-Host ""

npm run dev
