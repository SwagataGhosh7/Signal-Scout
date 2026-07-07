# Target Account Management - Start Frontend Server
# PowerShell script to start frontend development server

Write-Host "=" * 60
Write-Host "Target Account Management - Frontend Server"
Write-Host "=" * 60
Write-Host ""

# Check if in correct directory
if (-not (Test-Path "./src/main.tsx")) {
    Write-Host "[ERROR] Please run this script from the frontend directory"
    Write-Host "Usage: cd frontend; .\start-frontend.ps1"
    exit 1
}

Write-Host "[1/2] Checking dependencies..."
if (-not (Test-Path "./node_modules")) {
    Write-Host "[2/2] Installing dependencies..."
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[ERROR] npm install failed"
        exit 1
    }
    Write-Host "[OK] Dependencies installed"
}

Write-Host "[2/2] Starting frontend server..."
Write-Host ""
Write-Host "Frontend UI: http://localhost:5173"
Write-Host "API Endpoint: http://localhost:3001"
Write-Host ""
Write-Host "Press Ctrl+C to stop"
Write-Host ""

npm run dev
