@echo off
REM Start Frontend Server - Windows Batch Script

setlocal enabledelayedexpansion

if not exist "src\main.tsx" (
    echo [ERROR] Please run this from the frontend directory
    echo Usage: cd frontend ^&^& start-frontend.bat
    pause
    exit /b 1
)

echo.
echo ============================================================
echo Target Account Management - Frontend Server
echo ============================================================
echo.

if not exist "node_modules" (
    echo [1/2] Installing dependencies...
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
echo [2/2] Starting frontend server...
echo.
echo Frontend UI: http://localhost:5173
echo API Endpoint: http://localhost:3001
echo.
echo Press Ctrl+C to stop
echo.

npm run dev
pause
