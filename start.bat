@echo off
title StudyingStocks Dev Server

echo ============================================
echo   StudyingStocks Dev Server - Start
echo ============================================
echo.

cd /d "%~dp0"

if not exist "node_modules" (
    echo [!] Installing packages...
    echo.
    call npm install
    if errorlevel 1 (
        echo [ERROR] npm install failed
        pause
        exit /b 1
    )
    echo.
)

echo [*] Starting Next.js dev server... (http://localhost:3001)
echo [*] To stop: close this window or run stop.bat
echo.

npm run dev -- -p 3001
