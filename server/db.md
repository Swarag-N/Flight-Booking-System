```
C:\Path\To\Flight-Booking-System>psql -U postgres
Password for user postgres:
psql (12.2)
WARNING: Console code page (850) differs from Windows code page (1252)
         8-bit characters might not work correctly. See psql reference
         page "Notes for Windows users" for details.
Type "help" for help.

postgres=# CREATE DATABASE fbs;
CREATE DATABASE
postgres=# CREATE USER admin WITH PASSWORD 'Swarag';
CREATE ROLE
postgres=# GRANT ALL PRIVILEGES ON DATABASE fbs TO admin;
GRANT
postgres-# \q
```
