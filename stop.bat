@echo off
title StudyingStocks Dev Server - Stop

echo ============================================
echo   StudyingStocks Dev Server - Stop
echo ============================================
echo.

powershell -Command "Get-NetTCPConnection -LocalPort 3001 -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue; Write-Host '[OK] Stopped process PID:' $_.OwningProcess }; if (-not (Get-NetTCPConnection -LocalPort 3001 -ErrorAction SilentlyContinue)) { Write-Host '[i] No server running on port 3001' }"

echo.
pause
