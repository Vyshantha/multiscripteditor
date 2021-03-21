#!/bin/sh
./stopMSE.sh

# Local Hostname
HOSTNAME=`ifconfig -a | grep -i "inet " | awk 'NR==2{print $2}'`
clear
# Update Environment file
echo $HOSTNAME
cd env

sed -i -e 's|"hostname" :.*,|"hostname" :"'$HOSTNAME'",|g' sva_config.json

cd ../editorClient

# Build Production for the Client-Side
# ng build --prod --live-reload false
# sleep 5s

# Start Client Side
ng serve --host 0.0.0.0 --port 4200 --ssl true --ssl-cert ./../routes/server.crt --ssl-key ./../routes/key.pem &

sleep 10s
cd ..

# Local Tunnel for Reverse Proxy
#lt --port 3333 --subdomain anyeditorschoice &

#open https://$HOSTNAME:4200/sva

# Start the Server-Side
nodemon &