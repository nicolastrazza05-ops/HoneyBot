@echo off
title HoneyBot
echo ==========================================
echo           HONEYBOT - AVVIO
echo ==========================================

:: Controllo se node_modules esiste già
if not exist node_modules (
    echo [INFO] Prima installazione: scarico le librerie...
    call npm install
    echo [INFO] Librerie installate con successo!
    echo.
)

echo [INFO] Avvio del bot in corso...
node index.js

echo.
echo [!] Il processo si e' interrotto.
pause