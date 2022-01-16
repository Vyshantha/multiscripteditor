# This file converts http://kbdlayout.info XML CLDR LDML layouts type to Local Keyboard-Layout layout-locale-**.json
import json
import xml.etree.ElementTree as KL
from pprint import pprint
import os

def needASpaceChar(currentTagSubElem, previousTagSubElem, currentValue):
    if currentValue == '\\u{304}':
        return {"value": "\u00A0", "action": "char"}
    elif int(currentTagSubElem) != int(previousTagSubElem) + 1: 
        return {"value": "\u00A0", "action": "char"}

layoutKBD = KL.parse('template.xml')
root = layoutKBD.getroot()

qwerty1 = []
qwerty2 = [{"value": "↹", "action": "tab"}]
qwerty3 = []
qwerty4 = [{"value": "⇧", "action": "shift"}]
qwerty5 = [{"value": "⎈", "action": "contextmenu"},{"value": "AltGr", "action": "altGr"},{"value": "\u00A0", "action": "space"},{"value": "AltGr", "action": "altGr"},{"value": "←", "action": "left"},{"value": "↑", "action": "top"}, {"value": "→", "action": "right"},{"value": "↓", "action": "bottom"}]
qwertyShift1 = []
qwertyShift2 = [{"value": "↹", "action": "tab"}]
qwertyShift3 = []
qwertyShift4 = [{"value": "⇧", "action": "shift"}]
qwertyShift5 = [{"value": "⎈", "action": "contextmenu"},{"value": "AltGr", "action": "altGr"},{"value": "\u00A0", "action": "space"},{"value": "AltGr", "action": "altGr"},{"value": "←", "action": "left"},{"value": "↑", "action": "top"}, {"value": "→", "action": "right"},{"value": "↓", "action": "bottom"}]
altGrNeeded = False
altGr1 = []
altGr2 = [{"value": "↹", "action": "tab"}]
altGr3 = []
altGr4 = [{"value": "⇧", "action": "shift"}]
altGr5 = [{"value": "⎈", "action": "contextmenu"},{"value": "AltGr", "action": "altGr"},{"value": "\u00A0", "action": "space"},{"value": "AltGr", "action": "altGr"},{"value": "←", "action": "left"},{"value": "↑", "action": "top"}, {"value": "→", "action": "right"},{"value": "↓", "action": "bottom"}]
altGrCapsNeeded = False
altGrCaps1 = []
altGrCaps2 = [{"value": "↹", "action": "tab"}]
altGrCaps3 = []
altGrCaps4 = [{"value": "⇧", "action": "shift"}]
altGrCaps5 = [{"value": "⎈", "action": "contextmenu"},{"value": "AltGr", "action": "altGr"},{"value": "\u00A0", "action": "space"},{"value": "AltGr", "action": "altGr"},{"value": "←", "action": "left"},{"value": "↑", "action": "top"}, {"value": "→", "action": "right"},{"value": "↓", "action": "bottom"}]

for elem in root:
    if elem.tag == 'keyMap' and elem.attrib.get('modifiers') == None:
        for subelem in elem:
            if subelem.tag == 'map':
                # Row1
                if subelem.attrib.get('iso').find('E') == 0 and subelem.attrib.get('to') != '\\u{22}':
                    qwerty1.append({'value': subelem.attrib.get('to'), 'action': 'char'})
                # Row2
                elif subelem.attrib.get('iso').find('D') == 0 and subelem.attrib.get('to') != '\\u{09}':
                    qwerty2.append({'value': subelem.attrib.get('to'), 'action': 'char'})
                # Row3
                elif subelem.attrib.get('iso').find('C') == 0 and subelem.attrib.get('to') != '\\u{0D}':
                    qwerty3.append({'value': subelem.attrib.get('to'), 'action': 'char'})
                # Row4
                elif subelem.attrib.get('iso').find('B') == 0 and subelem.attrib.get('to') != '\\u{22}':
                    qwerty4.append({'value': subelem.attrib.get('to'), 'action': 'char'})
    elif elem.tag == 'keyMap' and elem.attrib.get('modifiers') == 'shift':
        for subelem in elem:
            if subelem.tag == 'map':
                # Row1
                if subelem.attrib.get('iso').find('E') == 0 and subelem.attrib.get('to') != '\\u{22}':
                    qwertyShift1.append({'value': subelem.attrib.get('to'), 'action': 'char'})
                # Row2
                elif subelem.attrib.get('iso').find('D') == 0 and subelem.attrib.get('to') != '\\u{09}':
                    qwertyShift2.append({'value': subelem.attrib.get('to'), 'action': 'char'})
                # Row3
                elif subelem.attrib.get('iso').find('C') == 0 and subelem.attrib.get('to') != '\\u{0D}' and subelem.attrib.get('to') != '\\u{22}':
                    qwertyShift3.append({'value': subelem.attrib.get('to'), 'action': 'char'})
                # Row4
                elif subelem.attrib.get('iso').find('B') == 0 and subelem.attrib.get('to') != '\\u{22}':
                    qwertyShift4.append({'value': subelem.attrib.get('to'), 'action': 'char'})
    elif elem.tag == 'keyMap' and (elem.attrib.get('modifiers') == 'ctrl+alt+caps caps+altR' or elem.attrib.get('modifiers') == 'ctrl+alt altR' or elem.attrib.get('modifiers') == 'VK_OEM_8'):
        altGrNeeded = True
        for subelem in elem:
            if subelem.tag == 'map':
                # Row1
                if subelem.attrib.get('iso').find('E') == 0 and subelem.attrib.get('to') != '\\u{22}':
                    altGr1.append({'value': subelem.attrib.get('to'), 'action': 'char'})
                # Row2
                elif subelem.attrib.get('iso').find('D') == 0 and subelem.attrib.get('to') != '\\u{09}':
                    altGr2.append({'value': subelem.attrib.get('to'), 'action': 'char'})
                # Row3
                elif subelem.attrib.get('iso').find('C') == 0 and subelem.attrib.get('to') != '\\u{0D}':
                    altGr3.append({'value': subelem.attrib.get('to'), 'action': 'char'})
                # Row4
                elif subelem.attrib.get('iso').find('B') == 0 and subelem.attrib.get('to') != '\\u{22}':
                    altGr4.append({'value': subelem.attrib.get('to'), 'action': 'char'})
    elif elem.tag == 'keyMap' and (elem.attrib.get('modifiers') == 'shift+ctrl+alt+caps shift+caps+altR' or elem.attrib.get('modifiers') == 'shift+ctrl+alt shift+altR' or elem.attrib.get('modifiers') == 'shift+VK_OEM_8'):
        altGrCapsNeeded = True
        for subelem in elem:
            if subelem.tag == 'map':
                # Row1
                if subelem.attrib.get('iso').find('E') == 0 and subelem.attrib.get('to') != '\\u{22}':
                    altGrCaps1.append({'value': subelem.attrib.get('to'), 'action': 'char'})
                # Row2
                elif subelem.attrib.get('iso').find('D') == 0 and subelem.attrib.get('to') != '\\u{09}':
                    altGrCaps2.append({'value': subelem.attrib.get('to'), 'action': 'char'})
                # Row3
                elif subelem.attrib.get('iso').find('C') == 0 and subelem.attrib.get('to') != '\\u{0D}':
                    altGrCaps3.append({'value': subelem.attrib.get('to'), 'action': 'char'})
                # Row4
                elif subelem.attrib.get('iso').find('B') == 0 and subelem.attrib.get('to') != '\\u{22}':
                    altGrCaps4.append({'value': subelem.attrib.get('to'), 'action': 'char'})

qwerty3.append({"value": "\u23CE", "action": "enter"})
qwerty4.append({"value": "⇧", "action": "shift"})
qwertyShift3.append({"value": "\u23CE", "action": "enter"})
qwertyShift4.append({"value": "⇧", "action": "shift"})
altGr3.append({"value": "\u23CE", "action": "enter"})
altGr4.append({"value": "⇧", "action": "shift"})
altGrCaps3.append({"value": "\u23CE", "action": "enter"})
altGrCaps4.append({"value": "⇧", "action": "shift"})

myJSONLayout = ''

### Layout for QWERTY Style Only ###

#if altGrNeeded == True and altGrCapsNeeded == True:
#    myJSONLayout = '[{"qwerty":' + str(qwerty1) + '},{"qwerty":' + str(qwerty2) + '},{"qwerty":' + str(qwerty3) + '},{"qwerty":' + str(qwerty4) + '},{"qwerty":' + str(qwerty5) + '},{"qwertyShift":' + str(qwertyShift1) + '},{"qwertyShift":' + str(qwertyShift2) + '},{"qwertyShift":' + str(qwertyShift3) + '},{"qwertyShift":' + str(qwertyShift4) + '},{"qwertyShift":' + str(qwertyShift5) + '},{"altGr":' + str(altGr1) + '},{"altGr":' + str(altGr2) + '},{"altGr":' + str(altGr3) + '},{"altGr":' + str(altGr4) + '},{"altGr":' + str(altGr5) + '},{"altGrCaps":' + str(altGrCaps1) + '},{"altGrCaps":' + str(altGrCaps2) + '},{"altGrCaps":' + str(altGrCaps3) + '},{"altGrCaps":' + str(altGrCaps4) + '},{"altGrCaps":' + str(altGrCaps5) + '}]'
#elif altGrNeeded == True and altGrCapsNeeded == False:
#    myJSONLayout = '[{"qwerty":' + str(qwerty1) + '},{"qwerty":' + str(qwerty2) + '},{"qwerty":' + str(qwerty3) + '},{"qwerty":' + str(qwerty4) + '},{"qwerty":' + str(qwerty5) + '},{"qwertyShift":' + str(qwertyShift1) + '},{"qwertyShift":' + str(qwertyShift2) + '},{"qwertyShift":' + str(qwertyShift3) + '},{"qwertyShift":' + str(qwertyShift4) + '},{"qwertyShift":' + str(qwertyShift5) + '},{"altGr":' + str(altGr1) + '},{"altGr":' + str(altGr2) + '},{"altGr":' + str(altGr3) + '},{"altGr":' + str(altGr4) + '},{"altGr":' + str(altGr5) + '}]'
#elif altGrNeeded == False and altGrCapsNeeded == False:
#    myJSONLayout = '[{"qwerty":' + str(qwerty1) + '},{"qwerty":' + str(qwerty2) + '},{"qwerty":' + str(qwerty3) + '},{"qwerty":' + str(qwerty4) + '},{"qwerty":' + str(qwerty5) + '},{"qwertyShift":' + str(qwertyShift1) + '},{"qwertyShift":' + str(qwertyShift2) + '},{"qwertyShift":' + str(qwertyShift3) + '},{"qwertyShift":' + str(qwertyShift4) + '},{"qwertyShift":' + str(qwertyShift5) + '}]'

### Layout for Transliteration or Phonetic Style Only ####

if altGrNeeded == True and altGrCapsNeeded == True:
    myJSONLayout = '[{"qwertyTrans":' + str(qwerty1) + '},{"qwertyTrans":' + str(qwerty2) + '},{"qwertyTrans":' + str(qwerty3) + '},{"qwertyTrans":' + str(qwerty4) + '},{"qwertyTrans":' + str(qwerty5) + '},{"qwertyShiftTrans":' + str(qwertyShift1) + '},{"qwertyShiftTrans":' + str(qwertyShift2) + '},{"qwertyShiftTrans":' + str(qwertyShift3) + '},{"qwertyShiftTrans":' + str(qwertyShift4) + '},{"qwertyShiftTrans":' + str(qwertyShift5) + '},{"altGrTrans":' + str(altGr1) + '},{"altGrTrans":' + str(altGr2) + '},{"altGrTrans":' + str(altGr3) + '},{"altGrTrans":' + str(altGr4) + '},{"altGrTrans":' + str(altGr5) + '},{"altGrCapsTrans":' + str(altGrCaps1) + '},{"altGrCapsTrans":' + str(altGrCaps2) + '},{"altGrCapsTrans":' + str(altGrCaps3) + '},{"altGrCapsTrans":' + str(altGrCaps4) + '},{"altGrCapsTrans":' + str(altGrCaps5) + '}]'
elif altGrNeeded == True and altGrCapsNeeded == False:
    myJSONLayout = '[{"qwertyTrans":' + str(qwerty1) + '},{"qwertyTrans":' + str(qwerty2) + '},{"qwertyTrans":' + str(qwerty3) + '},{"qwertyTrans":' + str(qwerty4) + '},{"qwertyTrans":' + str(qwerty5) + '},{"qwertyShiftTrans":' + str(qwertyShift1) + '},{"qwertyShiftTrans":' + str(qwertyShift2) + '},{"qwertyShiftTrans":' + str(qwertyShift3) + '},{"qwertyShiftTrans":' + str(qwertyShift4) + '},{"qwertyShiftTrans":' + str(qwertyShift5) + '},{"altGrTrans":' + str(altGr1) + '},{"altGrTrans":' + str(altGr2) + '},{"altGrTrans":' + str(altGr3) + '},{"altGrTrans":' + str(altGr4) + '},{"altGrTrans":' + str(altGr5) + '}]'
elif altGrNeeded == False and altGrCapsNeeded == False:
    myJSONLayout = '[{"qwertyTrans":' + str(qwerty1) + '},{"qwertyTrans":' + str(qwerty2) + '},{"qwertyTrans":' + str(qwerty3) + '},{"qwertyTrans":' + str(qwerty4) + '},{"qwertyTrans":' + str(qwerty5) + '},{"qwertyShift":' + str(qwertyShift1) + '},{"qwertyShift":' + str(qwertyShift2) + '},{"qwertyShift":' + str(qwertyShift3) + '},{"qwertyShift":' + str(qwertyShift4) + '},{"qwertyShift":' + str(qwertyShift5) + '}]'

myJSONLayout = myJSONLayout.replace("'", '"').replace('"""', '"\\""').replace("\\xa0","\\u00A0").replace("\\xad", "\\u00A0")
print (myJSONLayout)

### Layout for QWERTY Style Only ###

#try:
#    os.remove('./layout-template.json') 
#except FileNotFoundError:
#    print ('No File present to Delete')
#open('./layout-template.json', "x")

#with open('./layout-template.json', 'w') as jsonFile:
#    json.dump(json.loads(myJSONLayout), jsonFile)

### Layout for Transliteration or Phonetic Style Only ####

try:
    os.remove('./layout-template_alt.json') 
except FileNotFoundError:
    print ('No File present to Delete')
open('./layout-template_alt.json', "x")

with open('./layout-template_alt.json', 'w', encoding='utf-8') as jsonFile:
    json.dump(json.loads(myJSONLayout), jsonFile, ensure_ascii=False)
