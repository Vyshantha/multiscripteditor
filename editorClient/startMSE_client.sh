#!/bin/sh
for id in $(ps -aef | grep -i 443 | awk '{print $2}'); do kill -9 $id; done

export NODE_OPTIONS="--max-old-space-size=8192"

# Local Hostname
HOSTNAME=`ifconfig -a | grep -i "inet " | awk 'NR==2{print $2}'`

# Update Environment file
echo $HOSTNAME
sed -i -e 's/^{"hostname" : ".*",/{"hostname" : "'$HOSTNAME'",/g' ./src/assets/environments/sva_config.json
rm -rf ./src/assets/environments/sva_config.json-e

# Start Client Side
ng serve --host 0.0.0.0 --port 443 --ssl true --ssl-cert ./server.crt --ssl-key ./key.pem --liveReload=false &