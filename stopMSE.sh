#!/bin/sh
for id in $(ps -aef | grep -i 4200 | awk '{print $2}'); do kill -9 $id; done
for id in $(ps -aef | grep -i 'node ' | awk '{print $2}'); do kill -9 $id; done