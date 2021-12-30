# this file extracts words list as JSON file from HTML extract of 1000 most common words of all Google Supported 108 languages
# pip3 install requests beautifulsoup4 
from bs4 import BeautifulSoup
import requests
import xml.etree.ElementTree as KL
from pprint import pprint
import json
import os

# Limitations - Odia, Tatar, Turkmen, Uyghur
url="https://1000mostcommonwords.com/1000-most-common-english-words/"

html_content = requests.get(url).text

print('Parse the HTML content')
soup = BeautifulSoup(html_content, "html.parser")

list_table = soup.find("table")
rows = list_table.tbody.find_all("tr")

extracted_list = []
source_name = url.split('-')[3]

for row in rows:
    cols = row.find_all('td')
    extract_data = [e.text.strip() for e in cols]
    if (extract_data[2] == "in English"):
        continue
    else:
        extracted_list.append({source_name: extract_data[1], "english": extract_data[2]})

print('Compling the JSON')

myList = str(extracted_list).replace("'", '"').replace('"""', '"\\""')

print('Uploading to ', source_name , '.json file')

try:
    os.remove('./' + source_name + '.json') 
except FileNotFoundError:
    print ('No File present to Delete')
open('./' + source_name + '.json', "x")

with open('./' + source_name + '.json', 'w') as jsonFile:
    json.dump(json.loads(myList), jsonFile)