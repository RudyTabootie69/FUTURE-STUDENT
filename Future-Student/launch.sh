echo "mySQL password = fsdbpw"
mysql --skip-ssl -u future-student -p futurestudentdb < ../Database/futurestudentdb-backup.sql
echo "
Test Users:

Student 1
username: tstu1
password: pw

Student 2
username: tstu2
password: pw

Secondary Staff
username: tsec1
password: pw

Parent: 
username: tpar1
password: pw
" 
/usr/bin/node -r tsx server/index.ts & npx vite --port 4000