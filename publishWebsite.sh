#!/bin/sh
./stopMSE.sh
# Publish to https://worldscriptsexplorer.page
cd editorClient
cp ./src/assets/environments/sva_config_prod.json ./src/assets/environments/sva_config.json && ng build --prod --build-optimizer && firebase deploy --project worldscriptsexplorer

# Copy all the source content over
cp -r ./src ./../editorClientCalculator/

cd ../editorClientCalculator
# Publish to https://worldscriptscalculator.app
cp ./src/assets/environments/sva_config_calc.json ./src/assets/environments/sva_config.json && ng build --prod --build-optimizer && firebase deploy --project worldscriptscalculator