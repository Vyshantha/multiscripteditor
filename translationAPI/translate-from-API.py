# This script is intended to Translate all Supported - *.json in this folder : /Users/vyshanthasimha/Documents/Work_Related/workspace/MultiScriptEditor/editorClient/src/assets/i18n
# export GOOGLE_APPLICATION_CREDENTIALS="/Users/vyshanthasimha/Documents/Work_Related/workspace/MultiScriptEditor/translationAPI/turnkey-alpha-327107-294870547941.json"
# pip install google-cloud-translate==2.0.1
# pip install --upgrade google-cloud-translate
import shutil
from bs4 import BeautifulSoup
from shutil import copyfile
from pprint import pprint
import requests
import xml.etree.ElementTree as KL
import json
import os
import sys

def translate_text(target, text):
    """Translates text into the target language.
    Target must be an ISO 639-1 language code.
    See https://g.co/cloud/translate/v2/translate-reference#supported_languages
    """
    import six
    from google.cloud import translate_v2 as translate

    translate_client = translate.Client()

    if isinstance(text, six.binary_type):
        text = text.decode("utf-8")

    # Text can also be a sequence of strings, in which case this method
    # will return a sequence of results for each text.
    result = translate_client.translate(text, target_language=target)

    #print(u"Text: {}".format(result["input"]))
    print(u"Translation: {}".format(result["translatedText"]))
    #print(u"Detected source language: {}".format(result["detectedSourceLanguage"]))
    return result["translatedText"]

## Loop here for all the Supported Languages ## 
supportedLanguage = ['ar','fa','ur','ps','sd','ug','he','yi','cs','af','sq','az','eu','ca','bs','ceb','hr','da','de','nl','eo','et','fi','fr','fy','gl','ha','haw','hu','is','ig','id','ga','it','rw','ku','lv','lt','lb','mg','ms','mt','no','pl','pt','ro','gd','sn','sk','sl','so','es','su','sw','sv','tg','tr','tk','uz','vi','cy','xh','yo','zu','be','bg','mk','ru','uk','tt','kk','sr','ky','mn','el','hy','ka','ko','mr','ne','hi','kn','te','ta','ml','pa','gu','or','bn','am','th','lo','km','my','jv','zh','zh-TW','ja','si','la','co','ht','hmn','ny','sm','st','tl', 'as', 'ay', 'bm', 'bho', 'dv', 'doi', 'ee', 'gn', 'ilo', 'gom', 'kri', 'ckb', 'ln', 'lg', 'mai', 'mni', 'lus', 'om', 'qu', 'sa', 'nso', 'ti', 'ts', 'ak']
# removed 'en','sa','sank'
## Note - locale : rename files zh = zhcn && zh-TW = zhtw
### v3 - 'as', 'ay', 'bm', 'bho', 'dv', 'doi', 'ee', 'gn', 'ilo', 'gom', 'kri', 'ckb', 'ln', 'lg', 'mai', 'mni', 'lus', 'om', 'qu', 'sa', 'nso', 'ti', 'ts', 'ak'  


# var allKeyboardCodes = "";
# Object.keys(this.keyboardLayouts).map(key => {
#   allKeyboardCodes = allKeyboardCodes + "'" + key + "',";
# });
# console.log('all the Keyboard codes ', allKeyboardCodes);*/

## Translation of All Strings in the UI for Supported Languages
for langCode in supportedLanguage:
    #with open('/Users/vyshanthasimha/Documents/Work_Related/workspace/MultiScriptEditor/translation_API/' + langCode + '.json') as json_file:
    with open('/Users/vyshanthasimha/Documents/Work_Related/workspace/MultiScriptEditor/editorClient/src/assets/i18n/' + langCode + '.json') as json_file:
        translateFile = json.load(json_file)
    missedTranslation = 'Paste Selelected Text'
    #for keys in translateFile:
    #    translateFile[keys] = translate_text(langCode, keys)
    translateFile[missedTranslation] = translate_text(langCode, missedTranslation)

    print('Compling the JSON for ', langCode)
    #with open('/Users/vyshanthasimha/Documents/Work_Related/workspace/MultiScriptEditor/translation_API/' + langCode + '.json', 'w') as outfile:
    with open('/Users/vyshanthasimha/Documents/Work_Related/workspace/MultiScriptEditor/editorClient/src/assets/i18n/' + langCode + '.json', 'w', encoding='utf-8') as outfile:
        json.dump(translateFile, outfile, ensure_ascii=False)