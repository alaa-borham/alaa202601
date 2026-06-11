@echo off
chcp 65001 >nul
title LEVEL7 - تحديث النسخة المحلية
echo.
echo ====== LEVEL7 ======
echo جارٍ تنزيل أحدث نسخة من الموقع...
echo.
set BASE=https://alaa-borham.github.io/alaa202601
curl -sL -o index.html    "%BASE%/index.html"    && echo [OK] index.html
curl -sL -o admin.html    "%BASE%/admin.html"    && echo [OK] admin.html
curl -sL -o sw.js         "%BASE%/sw.js"         && echo [OK] sw.js
curl -sL -o manifest.json "%BASE%/manifest.json" && echo [OK] manifest.json
curl -sL -o icon-192.png  "%BASE%/icon-192.png"  && echo [OK] icon-192.png
curl -sL -o icon-512.png  "%BASE%/icon-512.png"  && echo [OK] icon-512.png
echo.
echo ✔ اكتمل التحديث — نسختك المحلية الآن مطابقة للموقع.
echo.
pause
