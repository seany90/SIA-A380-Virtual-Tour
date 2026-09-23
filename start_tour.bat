@echo off
title Singapore Airlines A380 Virtual Tour
echo ============================================================
echo Starting Singapore Airlines A380 Virtual Tour Local Server...
echo ============================================================
echo Serving files at: http://localhost:8080
start "" "http://localhost:8080"
python -m http.server 8080
pause
