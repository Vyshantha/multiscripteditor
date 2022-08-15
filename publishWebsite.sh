#!/bin/sh
./stopMSE.sh
# Publish to https://worldscriptsexplorer.page
cd editorClient
cp ./src/assets/environments/sva_config_prod.json ./src/assets/environments/sva_config.json && ng build --prod --build-optimizer && firebase deploy --project worldscriptsexplorer
# Google Tag G-QSCLMX9T5B

# Copy all the source content over
cp -r ./src ./../editorClientCalculator/

cd ../editorClientCalculator/src
# Replace Tags and URLs
sed 's/QSCLMX9T5B/J8VB632PHZ/g' index.html > index2.html
sed 's/worldscriptsexplorer/worldscriptscalculator/g' index2.html > index.html
sed 's/worldscriptscalculator.page/worldscriptscalculator.app/g' index.html > index2.html
cp index2.html index.html
rm -rf index2.html

cd ..
# Publish to https://worldscriptscalculator.app
cp ./src/assets/environments/sva_config_calc.json ./src/assets/environments/sva_config.json && ng build --prod --build-optimizer && firebase deploy --project worldscriptscalculator
# Google Tag G-J8VB632PHZ
