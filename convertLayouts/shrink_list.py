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
i = 0
for entry in locale:
    if i % 9 == 0:
        myLocale.append({"ukrainian": entry})
    i = i + 1


print("Locale list is generated")

try:
    os.remove('./ukrainian.json') 
except FileNotFoundError:
    print ('No File present to Delete')
open('./ukrainian.json', "x")

with open('./ukrainian.json', 'w', encoding='utf-8') as jsonFile:
    json.dump(myLocale, jsonFile, ensure_ascii=False)

print("Dumped into a JSON file")