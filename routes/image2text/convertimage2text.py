import sys
import json
import easyocr

if len(sys.argv) == 4 and (str(sys.argv[1]) == "file" or str(sys.argv[1]) == "url"):
    reader = easyocr.Reader(sys.argv[2].split(","))
    result = reader.readtext(sys.argv[3])
    print(result)

# Dictionary paths : /usr/local/lib/python3.8/site-packages/easyocr/dict/~~~_char.txt
# Character paths : /usr/local/lib/python3.8/site-packages/easyocr/character/~~.txt