@echo off

for /f "tokens=1-2 delims=:" %%a in ('ipconfig^|find "IPv4"') do set ip=%%b
set ip=%ip:~1%
echo %ip%

for /f %%A in (./env/sva_config.json) do (
    SET HOSTNAME = %ip%
)

nodemon &

cd client
ng serve --host %ip% --port 4200 --ssl true --ssl-cert ./routes/server.crt --ssl-key ./routes/key.pem &

start 'https://%ip%:4200/sva'