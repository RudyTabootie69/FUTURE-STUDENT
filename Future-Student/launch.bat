@echo off "Starting development servers..."
echo "mySQL password = fsdbpw"
mysql --skip-ssl -u future-student -p futurestudentdb < ../Database/futurestudentdb-backup.sql
if errorlevel 1 (
  echo MySQL import failed.
  goto :eof
)
echo.
echo Test Users:
echo.
echo Student 1
echo username: tstu1
echo password: pw
echo.

echo Student 2
echo username: tstu2
echo password: pw
echo.

echo Secondary Staff
echo username: tsec1
echo password: pw
echo.

echo Parent:
echo username: tpar1
echo password: pw
echo.

start ""/B cmd /c "node -r tsx server\index.ts"
start ""/B cmd /c "npx vite --port 4000"
