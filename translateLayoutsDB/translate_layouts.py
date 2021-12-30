# this file extracts translation for languages from URL and generates the Layout for Keyboard DB for all Google Supported 108 languages
# pip3 install requests beautifulsoup4 
import shutil
from bs4 import BeautifulSoup
from shutil import copyfile
from pprint import pprint
import requests
import xml.etree.ElementTree as KL
import json
import os
import sys

## Loop here for all the Supported Languages
supportedLanguage = ['ar','fa','ur','ps','sd','ug','he','yi','cs','af','sq','az','eu','ca','bs','ceb','hr','da','de','nl','eo','et','fi','fr','fy','gl','ha','haw','hu','is','ig','id','ga','it','rw','ku','lv','lt','lb','mg','ms','mt','no','pl','pt','ro','gd','sn','sk','sl','so','es','su','sw','sv','tg','tr','tk','uz','vi','cy','xh','yo','zu','be','bg','mk','ru','uk','tt','kk','sr','ky','mn','el','hy','ka','ko','sa','mr','ne','hi','kn','te','ta','ml','pa','gu','or','bn','am','th','lo','km','my','jv','zh','zh_Hant','ja','si']
# removed 'en','la','co','ht','hmn','ny','sm','st','tl','sank'

for langCode in supportedLanguage:
    url="https://unicode-org.github.io/cldr-staging/charts/latest/summary/" + langCode + ".html"

    fileName = shutil.copyfile('/Users/vyshanthasimha/Documents/Work_Related/workspace/MultiScriptEditor/translate_layouts_db/keysboards-layouts.json', '/Users/vyshanthasimha/Documents/Work_Related/workspace/MultiScriptEditor/translate_layouts_db/keysboards-layouts_' + langCode + '.json')

    with open(fileName) as json_file:
        translateDB = json.load(json_file)

    html_content = requests.get(url).text

    print('Parse the HTML content for ', langCode)
    requiredTable = BeautifulSoup(html_content, "html.parser")
    list_table = requiredTable.find_all('table')[3:]

    for row in list_table[0].find_all('tr'):
        cols = row.find_all('td')
        extract_data = [e.text.strip() for e in cols]
        if extract_data == []:
            continue
        if " ► " in extract_data[4]:
            try:
                dbKey = extract_data[4].split(' ► ')[1]
                #print('translate ', extract_data[4], extract_data[5], extract_data[6], translateDB[dbKey][2])
                translateDB[dbKey][2] = extract_data[6]
            except KeyError:
                print('excempt ', extract_data[4].split(' ► ')[1])

    print('Compling the JSON for ', langCode)

    with open(fileName, 'w') as outfile:
        json.dump(translateDB, outfile)

print('Finished Translation of DBs')