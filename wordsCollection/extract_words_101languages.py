# this file extracts words list as JSON file from HTML extract of 1000 most common words of all Google Supported 108 languages
# pip3 install requests beautifulsoup4 
from bs4 import BeautifulSoup
import requests
import xml.etree.ElementTree as KL
from pprint import pprint
import json
import os

url="https://www.101languages.net/yiddish/yiddish-word-list/"

source_name = url.split('/')[3]

print('source name ', source_name)

html_content = requests.get(url).text

print('Parse the HTML content')
soup = BeautifulSoup(html_content, "html.parser")

list_table = soup.find("table")
rows = list_table.find_all("tr")

extracted_list = []

for row in rows:
    cols = row.find_all('td')
    extract_data = [e.text.strip() for e in cols]
    if 'English' in extract_data[0]:
        continue
    else:
        wordsInExtract = extract_data[0].split('\n')
        print('\nextracted ', wordsInExtract)
        i = 0
        englishWord = ''
        for word in wordsInExtract:
            if i == 0:
                englishWord = word
                i = i + 1
            else:
                if ' / ' in word:
                    for splits in word.split(' / '):
                        extracted_list.append({source_name: splits, "english": englishWord})
                elif ', ':
                    for splits in word.split(', '):
                        extracted_list.append({source_name: splits, "english": englishWord})
                else:
                    extracted_list.append({source_name: word, "english": englishWord})

myList = str(extracted_list).replace("'", '"').replace('"""', '"\\""')
print('Compling the JSON ', myList)

try:
    os.remove('./' + source_name + '.json') 
except FileNotFoundError:
    print ('No File present to Delete')
open('./' + source_name + '.json', "x")

with open('./' + source_name + '.json', 'w') as jsonFile:
    json.dump(json.loads(myList), jsonFile)