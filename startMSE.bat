@echo off

for /F "tokens=14" %%i in ('"ipconfig | findstr IPv4"') do SET ip=%%i
echo %ip%

for /f %%A in (./routes/environments/sva_config.json) do (
    SET HOSTNAME = %ip%
)


cd editorClient

nodemon &

ng serve --host %ip%% --port 4200 --ssl true --ssl-cert ./../routes/server.crt --ssl-key ./../routes/key.pem &

start 'https://%ip%:4200/'