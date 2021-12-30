# this file extracts words list as JSON file from HTML extract of 1000 most common words of all Google Supported 108 languages
# pip3 install requests beautifulsoup4 
from bs4 import BeautifulSoup
import requests
import xml.etree.ElementTree as KL
from pprint import pprint
import json
import os

url="https://en.wiktionary.org/wiki/Appendix:Bashkir_Swadesh_list"

html_content = requests.get(url).text

print('Parse the HTML content')
soup = BeautifulSoup(html_content, "html.parser")

list_table = soup.find("table")
rows = list_table.tbody.find_all("tr")

extracted_list = []
source_name = url.split('_')[0].split(':')[2].lower()

for row in rows:
    cols = row.find_all('td')
    extract_data = [e.text.strip() for e in cols]
    #print('\nrow ', extract_data)
    if len(extract_data) < 2:
        continue
    else:
        if ',' in extract_data[2]:
            for wordSplit in extract_data[2].split(','):
                if wordSplit.split(' ')[0] != '': 
                    extracted_list.append({source_name: wordSplit.split(' ')[0], "english": extract_data[1].split('(')[0]})
                else:
                    extracted_list.append({source_name: wordSplit.split(' ')[1], "english": extract_data[1].split('(')[0]})
        elif '/' in extract_data[2]:
            for wordSplit in extract_data[2].split('/'):
                extracted_list.append({source_name: wordSplit, "english": extract_data[1].split('(')[0]})
        elif extract_data[2] != '':
            extracted_list.append({source_name: extract_data[2], "english": extract_data[1].split('(')[0]})

myList = str(extracted_list).replace("'", '"').replace('"""', '"\\""')
print('Compling the JSON ', myList , ' uploading to ', source_name , '.json file')

try:
    os.remove('./' + source_name + '.json') 
except FileNotFoundError:
    print ('No File present to Delete')
open('./' + source_name + '.json', "x")

with open('./' + source_name + '.json', 'w') as jsonFile:
    json.dump(json.loads(myList), jsonFile)