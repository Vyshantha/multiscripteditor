#!/bin/sh
./stopMSE.sh

export NODE_OPTIONS="--max-old-space-size=8192"

# Local Hostname
HOSTNAME=`ifconfig -a | grep -i "inet " | awk 'NR==2{print $2}'`

# Update Environment file
echo $HOSTNAME
sed -i -e 's/^{"hostname" : ".*",/{"hostname" : "'$HOSTNAME'",/g' ./routes/environments/sva_config.json
rm -rf ./routes/environments/sva_config.json-e
sed -i -e 's/^{"hostname" : ".*",/{"hostname" : "'$HOSTNAME'",/g' ./editorClient/src/assets/environments/sva_config.json
rm -rf ./editorClient/src/assets/environments/sva_config.json-e

cd editorClient

# Build Production for the Client-Side "--liveReload=false" (rm -rf node_modules package-lock.json) , 
## budget:[] updatedin angular.json for higher SCSS limit
# ng build --prod --build-optimizer
## export NODE_OPTIONS="--max-old-space-size=8192" √ X = 4096 or 8192
# node --max-old-space-size=X node_modules/@angular/cli/bin/ng build --prod
#sleep 5s

# Start Client Side
ng serve --host 0.0.0.0 --port 4200 --ssl true --ssl-cert ./../routes/server.crt --ssl-key ./../routes/key.pem --liveReload=false &

sleep 10s
cd ..

# Local Tunnel for Reverse Proxy
#lt --port 3333 --subdomain anywriteschoice &

#open https://$HOSTNAME:4200/sva

# Start the Server-Side
nodemon &