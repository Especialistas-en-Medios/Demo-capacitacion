@echo off
title Servidor Local - Capacitacion Git & GitHub
cls
echo Iniciando servidor local con PowerShell...
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0servidor.ps1"
if %ERRORLEVEL% neq 0 (
    echo.
    echo Ocurrio un problema al iniciar el servidor con PowerShell.
    pause
)
