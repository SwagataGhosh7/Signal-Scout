@echo off
REM Target Account Management - Local Setup Script for Windows
REM Run this script AFTER PostgreSQL is installed

echo.
echo ============================================================
echo Target Account Management - LOCAL SETUP
echo ============================================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node.js is installed: 
node --version

REM Check if npm is installed
npm --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] npm is not installed or not in PATH
    pause
    exit /b 1
)

echo [OK] npm is installed: 
npm --version

REM Check if PostgreSQL is installed
psql --version >nul 2>&1
if errorlevel 1 (
    echo.
    echo [WARNING] PostgreSQL is not in PATH or not installed
    echo Please install PostgreSQL from https://www.postgresql.org/download/windows/
    echo.
    echo After installation:
    echo 1. Create database: target_accounts
    echo 2. Create user: targetsadmin with password: securepassword123
    echo 3. Grant privileges to targetsadmin
    echo.
    echo See LOCAL_SETUP.md for detailed instructions
    pause
    exit /b 1
)

echo [OK] PostgreSQL is installed:
psql --version

echo.
echo ============================================================
echo Installing Dependencies
echo ============================================================
echo.

REM Install backend dependencies
echo [1/2] Installing backend dependencies...
cd backend
if errorlevel 1 (
    echo [ERROR] Failed to change to backend directory
    pause
    exit /b 1
)

npm install
if errorlevel 1 (
    echo [ERROR] Backend npm install failed
    pause
    exit /b 1
)

echo [OK] Backend dependencies installed

REM Return to project root
cd ..

REM Install frontend dependencies
echo.
echo [2/2] Installing frontend dependencies...
cd frontend
if errorlevel 1 (
    echo [ERROR] Failed to change to frontend directory
    pause
    exit /b 1
)

npm install
if errorlevel 1 (
    echo [ERROR] Frontend npm install failed
    pause
    exit /b 1
)

echo [OK] Frontend dependencies installed

REM Return to project root
cd ..

echo.
echo ============================================================
echo Running Database Migrations
echo ============================================================
echo.

cd backend
npm run migrate
if errorlevel 1 (
    echo [WARNING] Database migration encountered an error
    echo This might be okay if the tables already exist
    echo.
)

cd ..

echo.
echo ============================================================
echo Setup Complete!
echo ============================================================
echo.
echo Next steps:
echo.
echo 1. Start Backend Server (Terminal 1):
echo    cd backend
echo    npm run dev
echo.
echo 2. Start Frontend Server (Terminal 2):
echo    cd frontend
echo    npm run dev
echo.
echo 3. Open in Browser:
echo    http://localhost:5173
echo.
echo Backend API: http://localhost:3001
echo.
echo ============================================================
echo.
pause
