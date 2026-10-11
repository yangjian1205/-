@echo off
cd /d E:\workbuddy2\portfolio
start "" npm run dev
ping 127.0.0.1 -n 4 >nul
start "" http://localhost:5173/
