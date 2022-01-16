# This file converts large EasyOCR dictionary to JSON for Suggestions
# -*- coding: utf-8 -*-

import json
import os
from pprint import pprint

locale = list([])

print("List before Deletion")

del locale[2::2]

print("After list deletion")

myLocale = []

for entry in locale:
    myLocale.append({"locale": entry})

print("Locale list is generated")

try:
    os.remove('./locale.json') 
except FileNotFoundError:
    print ('No File present to Delete')
open('./locale.json', "x")

with open('./locale.json', 'w', encoding='utf-8') as jsonFile:
    json.dump(myLocale, jsonFile, ensure_ascii=False)

print("Dumped into a JSON file")