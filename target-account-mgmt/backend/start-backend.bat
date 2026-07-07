@echo off
REM Start Backend Server - Windows Batch Script

setlocal enabledelayedexpansion

if not exist "src\server.ts" (
    echo [ERROR] Please run this from the backend directory
    echo Usage: cd backend ^&^& start-backend.bat
    pause
    exit /b 1
)

echo.
echo ============================================================
echo Target Account Management - Backend Server
echo ============================================================
echo.

if not exist "node_modules" (
    echo [1/3] Installing dependencies...
    npm install
    if errorlevel 1 (
        echo [ERROR] npm install failed
        pause
        exit /b 1
    )
    echo [OK] Dependencies installed
) else (
    echo [OK] Dependencies already installed
)

echo.
echo [2/3] Running database migrations...
npm run migrate
if errorlevel 1 (
    echo [WARNING] Migration had issues (might be okay if tables exist)
)

echo.
echo [3/3] Starting backend server...
echo.
echo Backend API: http://localhost:3001
echo Health Check: http://localhost:3001/health
echo.
echo Press Ctrl+C to stop
echo.

npm run dev
pause
