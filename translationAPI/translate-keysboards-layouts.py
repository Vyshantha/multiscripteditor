# This script is intended to Translate all Supported - *.json in this folder : /Users/vyshanthasimha/Documents/Work_Related/workspace/MultiScriptEditor/translateLayoutsDB 
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
## Note - locale : zh = zhcn && zh-TW = zhtw
### run command @ /Users/vyshanthasimha/Documents/Work_Related/workspace/MultiScriptEditor/translateLayoutsDB : cat supportedLocales.txt | xargs -I {} cp keysboards-layouts_en.json {}
#### v3 - 'as', 'ay', 'bm', 'bho', 'doi', 'ee', 'gn', 'ilo', 'gom', 'ckb', 'ln', 'lg', 'mai', 'mni', 'lus', 'om', 'qu', 'sa', 'ti', 'ts', 'ak', 'dv', 'nso', 'kri'  

allScripts = ['ar','fa','ur','ckb','ps','ks','rhg','sd','bal','jawi','skr','bsk','pego','ug','ajam','mnkar','he','yi','lad','syrc','madn','sert','estr','arc','samr','palm','elym','nbat','pal','xpr','psal','hatr','mani','sog','kult','mand','safa','xsa','ber','chrs','rohg','sina','an','cs','en','enus','engb','enintl','enin','ang','la','lld','ladla','af','sq','ak','ay','bjn','gor','ace','bm','ban','bugla','min','bcl','bis','bar','ast','az','eu','brxla','befr','ca','bsla','ceb','co','hr','da','de','latf','se','ch','nya','dgabf','dgagh','dag','luola','na','nl','bin','evnla','nld','fur','eo','et','ee','fo','fi','fr','njz','oc','frca','fy','gl','gall','eurkey','fon','gag','ki','apu','gn','ht','ha','haw','hmn','hu','is','ig','ipa','hil','rn','nde','ilo','id','iu','ipk','esk','esi','ga','it','jpn','pin','jer','jam','kbp','mh','kl','pam','kha','kg','kaz','csb','rw','ku','kir','mfe','crs','laj','ltg','lv','to','lij','nia','lfn','liv','lmo','lt','ln','li','lb','mg','ms','mt','mi','ty','no','br','kw','gv','mnk','mad','pap','pms','masu','mrw','mwl','lus','mic','mnla','mos','nap','rom','nrf','lg','om','pln','pag','ny','pl','pt','ptbr','ff','aa','kaa','rap','din','ro','sm','iast','gd','gsw','scu','wen','st','tn','nds','iai','ss','soom','srm','sc','sn','sk','sl','so','es','esmx','su','sw','sv','tl','tgk','kab','tdt','pau','tpi','tokp','ven','gil','tr','tk','uz','uyy','vi','vec','wbl','wa','war','cy','wo','wym','xh','ts','bjyo','ngyo','yo','zza','sgs','zu','lwo','cjk','njo','nag','meen','sii','nv','qu','kon','fj','uby','cdd','be','mns','kca','perm','bs','bg','mk','ru','uk','tt','ab','bak','kk','tuk','aze','sr','tg','uzb','ky','mn','evncy','sah','komi','usy','el','bact','ion','hy','ka','asom','nusk','tfng','mon','mnc','oira','xibe','todo','evn','galk','ko','hang','ugar','phn','xpu','nkoo','xpeo','copt','nubi','glag','mroo','lydi','hung','ital','ett','pice','lepo','phyg','sabe','ogam','runr','dale','goth','osma','olck','cari','lyci','elba','vith','avst','osge','adlm','wolf','sora','vah','mamb','zag','khat','luo','chik','adin','khaz','yezi','wcho','udi','cana','zou','cyrs','toto','avo','gael','hmnp','woal','arold','pauc','brah','maga','sa','mr','kthi','snd','gup','awa','bhi','bho','hne','doi','thak','danw','mwr','unr','ne','pmh','pi','raj','sat','xsr','nand','deva','hi','gom','kn','kfa','kok','tcy','tiga','sank','goyk','te','bhat','ta','vatt','bada','ml','gars','saur','pa','dog','gu','bhig','or','parj','tirh','bn','as','bish','khas','malt','brx','haj','kama','sylo','mni','si','ranj','tibt','lbj','sikk','dz','geez','am','ti','th','shan','lo','km','bug','end','bibi','jont','maka','thaa','diak','hmng','my','monn','sgaw','kham','jv','tglg','bali','sasa','phag','soyo','pall','mero','kuli','tdd','tavt','tale','taya','phk','blt','talu','btk','hano','tagb','orkh','dogr','koch','lana','gran','kada','kawi','khar','toch','modi','shrd','sidd','cakm','lepc','kali','sund','buhd','rjng','limb','siri','cham','mult','maha','takr','jaun','dhan','khoj','khud','mwan','renc','ahom','tang','zanb','tach','bhai','dham','newa','land','tika','tamu','lis','wara','ljp','gama','lamp','miao','gon','gonm','gong','tolo','marc','suz','bima','aima','cans','crew','cree','inuk','anis','carr','nask','ojib','man','hira','dana','kata','cher','yiii','yugt','vaii','mang','nwa','nshu','mend','loma','kpe','ibe','iba','esy','xce','wole','bamu','egha','ndju','linb','cprt','txr','bla','aam','dite','khom','moss','maya','tnq','zhcn','zhtw','bopo','kan','zih','ja','sux','elx','hit','kmt','hier','egyd','mer','luw','hurr','chun','txg','dilm','geba','dogb','jurc','zhua','warr','aztc','hanz','jiag','seal','shui','kaid','mikq','yoi','idu','nsi','iub','moon','sutton','banzsl','arsign','gbsign','ussign','casign','clsign','frsign','irsign','jasign','nlsign','desisign','kosign','nesign','plsign','essign','svsign','tusign','barnig','cued','silbo','all','math','dupl','chpi','pit','alch','opte','ding','rally','ics','flag','morse','rohon','serap','hampt','dorab','voyni','kosan','pauo','ayma','quip','tart','banp','bybl','cret','proel','oldel','isthm','jiah','linea','cymin','abtak','mixt','olme','phais','rongo','sidet','indus','vinc','zapo','dipi','wadh','sito','bashu','issy','khit','kohi','lydpa','tuji','shali','vikra','ikom','warg','numid','sawn','poll','asrun','beiku','bora','rovcb','falis','gothr','messa','uygo','osca','todh','kuba','hali','keri','tani','badl','bhuj','umb','ibal','sukth','munb','chis','odud','olon','haas','anga','chok','khez','loth','sang','yimc','tan','mari','zeme','mao','hava','poch','oui','mede','licc','kush','sata','len','ume','pung','sher','jir','yol','tsha','balta','baltb','byn','tgr','sgw','sate','evel','pyu','btm','btd','bts','tob','baga','dhur','gaba','goud','jata','kamm','kola','kond','koti','koya','kupi','mali','marm','mukh','sona','suga','rana','sava','yeru','adga','bacha','rash','kacha','hoya','vijay','drush','leke','coorg','nso','dv','pli','mai','kri','odu']

## Translation of Language names in Keysboards Layouts files
for langCode in supportedLanguage:
    shutil.copyfile('/Users/vyshanthasimha/Documents/Work_Related/workspace/MultiScriptEditor/translateLayoutsDB/keysboards-layouts.json', '/Users/vyshanthasimha/Documents/Work_Related/workspace/MultiScriptEditor/translateLayoutsDB/keysboards-layouts_' + langCode + '.json')
    print('Make copy of ', '/Users/vyshanthasimha/Documents/Work_Related/workspace/MultiScriptEditor/translateLayoutsDB/keysboards-layouts_' + langCode + '.json')

    with open('/Users/vyshanthasimha/Documents/Work_Related/workspace/MultiScriptEditor/translateLayoutsDB/keysboards-layouts_' + langCode + '.json') as json_file:
        translateFile = json.load(json_file)
    print('Translation for ', langCode)
    for keys in translateFile:
        print('key ', keys, translateFile[keys][2])
        if ('(' in translateFile[keys][2]):
            translateFile[keys][2] = translate_text(langCode, translateFile[keys][2].split('(')[0]) + "(" + translateFile[keys][2].split('(')[1]
        else:
            translateFile[keys][2] = translate_text(langCode, translateFile[keys][2])
            
    print('Compling the JSON for ', langCode)
    with open('/Users/vyshanthasimha/Documents/Work_Related/workspace/MultiScriptEditor/translateLayoutsDB/keysboards-layouts_' + langCode + '.json', 'w', encoding='utf-8') as outfile:
        json.dump(translateFile, outfile, ensure_ascii=False)