#!/bin/sh
for id in $(ps -aef | grep -i 443 | awk '{print $2}'); do kill -9 $id; done

export NODE_OPTIONS="--max-old-space-size=8192"

# Local Hostname
HOSTNAME=`ifconfig -a | grep -i "inet " | awk 'NR==2{print $2}'`

# Update Environment file
echo $HOSTNAME
sed -i -e 's/^{"hostname" : ".*",/{"hostname" : "'$HOSTNAME'",/g' ./environments/sva_config.json
rm -rf ./environments/sva_config.json-e

# Start the Server-Side
nodemon &