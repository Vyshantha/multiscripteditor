var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var helmet = require('helmet');
var http = require('http');
var https = require('https');
var fs = require('fs');
var path = require('path');
var PythonShell = require('python-shell');
const { spawn } = require('child_process');
var exec = require('child_process').exec;

var PropertiesReader = require('properties-reader');
var properties = new PropertiesReader(path.join(__dirname, `./environments/sva_config.properties`));

const SignedToken = require('./jwt_utils').signedToken;
const ValidateToken = require('./jwt_utils').validateToken;

var portSSL = process.env.PORT || 5555;
var port = process.env.PORT || 5000;

var app = express();
var appSSL = express();
var router = express.Router();

var keyboardsDB = JSON.parse(fs.readFileSync(path.join(__dirname, './keyboard-layouts/keysboards-layouts.json')));
var collectionOfSessionInfo = Array.from(JSON.parse(fs.readFileSync(path.join(__dirname, './session-info/session-info.json'))));

// Words Suggestion for All Supported Languages
const supportedLanguages = ['af','am','ar','ari','az','bak','be','befr','bg','bn','bopo','br','brah','bs','bsk','ca','ceb','co','cs','cy','da','de','el','en','engb','enin','enintl','enus','eo','es','esmx','et','eu','fa','fi','fj','fo','fr','frca','fy','ga','gd','gl','gn','goth','gu','gv','ha','haw','he','hi','hmn','hr','ht','hu','hy','id','ig','ilo','is','it','ja','jv','ka','kk','km','kn','ko','gom','kon','ku','kw','ky','la','lb','lfn','ln','lo','lt','lv','mg','mi','mk','ml','mn','mr','ms','mt','my','nag','ne','nl','nld','no','ny','nya','oji','or','pa','pin','pl','pli','ps','pt','ptbr','qu','rn','ro','rom','ru','rw','sa','sank','sd','si','sk','sl','sm','sn','so','sq','sr','st','su','sv','sw','ta','te','tfng','tg','th','tk','tl','tpi','tr','tt','ty','ug','uk','ur','uz','vi','xh','yi','yo','zhcn','zhtw','zu'];

const mappingForAdditionalLocales = {'enintl':'en', 'enin':'en', 'engb':'en', 'enus':'en', 'nld':'nl', 'esmx':'es', 'ptbr':'pt', 'befr':'fr', 'frca':'fr'};

// All Supported UI Locales
const translationSupportedLanguages = ['af','ak','am','ar','as','ay','az','be','bg','bho','bm','bn','bs','ca','ceb','ckb','co','cs','cy','da','de','doi','dv','ee','el','en','eo','es','et','eu','fa','fi','fr','fy','ga','gd','gl','gn','gom','gu','ha','haw','he','hi','hmn','hr','ht','hu','hy','id','ig','ilo','is','it','ja','jv','ka','kk','km','kn','ko','kri','ku','ky','la','lb','lg','ln','lo','lt','lus','lv','mai','mg','mk','ml','mn','mni','mr','ms','mt','my','ne','nl','no','nso','ny','om','or','pa','pl','ps','pt','qu','ro','ru','rw','sa','sank','sd','si','sk','sl','sm','sn','so','sq','sr','st','su','sv','sw','ta','te','tg','th','ti','tk','tl','tr','ts','tt','ug','uk','ur','uz','vi','xh','yi','yo','zhcn','zhtw','zu'];

const allQwertyKeyboards = ['aa','aam','ab','abtak','ace','adin','adlm','af','ahom','aima','ajam','ak','alch','all','am','an','ang','anis','apu','ar','arc','ari','arma','arold','arsign','as','asom','ast','avo','avst','awa','ay','ayma','az','aze','aztc','bact','bada','bak','bal','bali','bamu','ban','banp','banzsl','bar','barnig','bashu','bcl','be','befr','ber','bg','bhai','bharati','bhat','bhi','bhig','bho','bibi','bima','bin','bis','bish','bjn','bjyo','bla','blt','bm','bn','bopo','br','brah','brx','brxla','bs','bsk','bsla','btk','bug','bugla','buhd','bya','bybl','ca','cakm','cana','cans','cari','carr','casign','cdd','ceb','ch','cham','cher','chik','chpi','chrs','chun','cjk','ckb','clsign','co','copt','cprt','cree','cret','crew','crs','cs','csb','cued','cy','cymin','cyrs','da','dag','dale','dana','danw','de','desisign','deva','dgabf','dgagh','dham','dhan','diak','dilm','din','ding','dipi','dite','dog','dogb','dogr','doi','dorab','dupl','dv','dz','ee','egha','egyd','el','elba','elx','elym','en','end','engb','enin','enintl','enus','eo','es','esi','esk','esmx','essign','estr','esy','et','ett','eu','eurkey','evn','evncy','evnla','fa','ff','fi','fj','flag','fo','fon','fr','frca','frsign','fur','fy','ga','gael','gag','galk','gall','gama','gars','gbsign','gd','geba','geez','gil','gl','glag','gn','gon','gong','gonm','gor','goth','goyk','gran','gsw','gu','gup','gv','ha','haj','hampt','hang','hano','hanz','hatr','haw','he','hi','hier','hil','hira','hit','hmn','hmng','hmnp','hne','hr','ht','hu','hung','hurr','hy','iai','iast','iba','ibe','ics','id','idu','ig','ikom','iku','ilo','indus','ion','ipa','ipk','irsign','is','issy','isthm','it','ital','iu','iub','ja','jam','jasign','jaun','jawi','jer','jiag','jiah','jont','jpn','jurc','jv','ka','kaa','kab','kada','kaid','kali','kama','kan','kata','kawi','kaz','kbp','kca','kfa','kg','kha','kham','khar','khas','khat','khaz','khoj','khom','khud','ki','kir','kitl','kits','kk','kl','km','kmt','kn','ko','koch','kohi','kok','kom','komi','kon','kosan','kosign','kpe','kri','ks','kthi','ku','kuli','kult','kw','ky','la','lad','ladla','laj','lamp','lana','land','latf','lb','lbj','leke','lepc','lepo','lfn','lg','li','lij','limb','linb','linea','lis','liv','ljp','lld','lmo','ln','lo','loma','lt','ltg','luo','luola','lus','luw','lv','lwo','lyci','lydi','lydpa','mad','madn','maga','maha','mai','maka','malt','mamb','man','mand','mang','mani','marc','masu','math','maya','meen','mend','mer','mero','mfe','mg','mh','mi','mic','mikq','min','mixt','mk','ml','mn','mnc','mni','mnk','mnkar','mnla','mns','modi','mon','monn','moon','morse','mos','moss','mr','mroo','mrw','ms','mt','mult','mwan','mwl','mwr','my','na','nag','nand','nap','nask','nbat','nde','ndju','nds','ne','nesign','newa','ngyo','nia','njo','njz','nkoo','nl','nld','nlsign','no','nrf','nshu','nsi','nso','numid','nusk','nv','nwa','ny','nya','oc','ogam','oira','oji','olck','oldel','olme','om','onw','opte','or','orkh','osge','osma','pa','pag','pal','pall','palm','pam','pap','parj','pau','pauc','pauo','pego','perm','phag','phais','phk','phn','phyg','pi','pice','pin','pit','pl','pli','pln','plrd','plsign','pmh','pms','proel','ps','psal','pt','ptbr','qu','quip','raj','rally','ranj','rap','renc','rhg','rjng','rn','ro','rohg','rohon','rom','rongo','ru','runr','rw','sa','sabe','safa','sah','samr','sank','sasa','sat','saur','sc','scu','sd','se','seal','serap','sert','sgaw','sgnw','sgs','shali','shan','shrd','shui','si','sidd','sidet','sii','sikk','silbo','sina','siri','sito','sk','skr','sl','sm','sn','snd','so','sog','soom','sora','soyo','sq','sr','srm','ss','st','su','sund','sux','suz','sv','svsign','sw','sylo','syrc','ta','tach','tagb','takr','tale','talu','tamu','tang','tart','tavt','taya','tcy','tdd','tdt','te','tfng','tg','tgk','tglg','th','thaa','thak','ti','tibt','tig','tiga','tika','tirh','tk','tl','tn','tnq','to','toch','todo','tokp','tolo','toto','tpi','tr','tso','tt','tuji','tuk','tusign','txg','txr','ty','uby','udi','ug','ugar','uk','unr','ur','ussign','usy','uyy','uz','uzb','vah','vaii','vatt','vec','ven','vi','vikra','vinc','vith','voyni','wa','wadh','war','wara','warg','warr','wbl','wcho','wen','wo','woal','wole','wolf','wym','xce','xh','xibe','xpeo','xpr','xpu','xsa','xsr','yezi','yi','yiii','yo','yoi','yugt','zag','zanb','zapo','zhcn','zhtw','zhua','zih','zou','zu','zza'];

const allTransliterateKeyboards = ['as', 'bn', 'brx', 'gu', 'haj', 'hi', 'kn', 'ml', 'malt', 'mr', 'or', 'pa', 'sa', 'ta', 'te', 'ur', 'tirh', 'mni', 'hy', 'bg', 'km', 'mai'];

const wordSeparators = ["", " ", "·", "፡", "\u2009", "\u202F"];
const noSeparator = ["zhcn", "zhtw", "ja", "bopo", "pin"];
const visualSeparator = ["am", "tig", "ti"];
const zeroWidthSeparator  = ["bali", "jv", "km", "th", "lo", "shan", "tdd", "talu", "my"];
const syllabicSeparator = ["lis", "tibt"];

_isContains = function(json, value) {
    let contains = false;
    Object.keys(json).some(key => {
        contains = typeof json[key] === 'object' ? _isContains(json[key], value) : json[key] === value;
        return contains;
    });
    return contains;
 }

process.env.NODE_ENV = 'production';

// WARNING - does not validity and accept self signed certificates
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// Cross-Origin Resource Sharing being utilised
app.use(cors());
appSSL.use(cors());

// Body Parsing
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
appSSL.use(bodyParser.json({limit: '50mb'}));
appSSL.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));

appSSL.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", `https://${properties.get('client.app.hostname')}:${properties.get('client.angular.port')}`);
    res.header("Access-Control-Allow-Credentials", false);
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
    next();
});

// Setting Content-Security-Policy
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "script-src": ["'self'"],
      "style-src": null,
    },
  })
);

app.use(express.static(path.join(__dirname + '/views')));
app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'html');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", `https://${properties.get('client.app.hostname')}:${properties.get('client.angular.port')}`);
    res.header("Access-Control-Allow-Credentials", false);
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
    next();
});

router.get('/', function(req, res){
    res.sendFile('favicon.ico', {root : __dirname + '/views'});
});

router.get('/fav', function(req, res){
    res.sendFile('favicon.png', {root : __dirname + '/views'});
});

router.get('/v1/multiscripteditor', function(req, res){
    res.sendFile('index.html', {root : __dirname + '/views'});
});

// Send Token for the current Session
router.post('/v1/multiscripteditor/tokenForSession', function(req, res, next) {
    const dateForLogging = new Date().toISOString()
    console.info(`[MULTISCRIPTEDITOR] ${dateForLogging} Creating Token for a Session`);
    if (req && req.body.session == properties.get('token.self.bearer')) {  
        res.status(200);
        res.send({idToken: SignedToken(), expiresIn: properties.get('token.expires.seconds')});
    } else {
        res.status(400);
    }
});

// Retrieve the Keyboard Layouts DB
router.get('/v1/multiscripteditor/retrieveKeyboardsDB/InSupportedLanguage/:UILocale', function(req, res, next) {
    const dateForLogging = new Date().toISOString()
    console.info(`[MULTISCRIPTEDITOR] ${dateForLogging} Validating Token before retrieving the particular Keyboards Layout Database for language ${req.params.UILocale}`);
    if (ValidateToken(req).iss === properties.get('token.self.bearer')) {
        if (keyboardsDB && translationSupportedLanguages.indexOf(req.params.UILocale) > -1) {  
            res.status(200);
            res.send(JSON.parse(fs.readFileSync(path.join(__dirname, './keyboard-layouts/keysboards-layouts_' + req.params.UILocale + '.json'))));
        } else {
            res.status(300);
        }
    } else {
        res.status(400);
    }
});

// Retrieve the Keyboards Properties
router.get('/v1/multiscripteditor/:URLCode/properties', function(req, res, next) {
    const dateForLogging = new Date().toISOString()
    console.info(`[MULTISCRIPTEDITOR] ${dateForLogging} Validating Token before retrieving the particular Keyboards Properties`);
    if (ValidateToken(req).iss === properties.get('token.self.bearer')) {
        if (keyboardsDB && req.params.URLCode) {
            res.status(200);
            res.send(keyboardsDB[req.params.URLCode]);
        } else {
            res.status(300);
        }
    } else {
        res.status(400);
    }
});

// Retrieve the Keyboards Layout
router.get('/v1/multiscripteditor/:URLCode/keyboardLayout', function(req, res, next) {
    const dateForLogging = new Date().toISOString()
    console.info(`[MULTISCRIPTEDITOR] ${dateForLogging} Validating Token before retrieving the particular Keyboards Layout`);
    if (ValidateToken(req).iss === properties.get('token.self.bearer')) {
        if (keyboardsDB && req.params.URLCode) {
            res.status(200);
            res.send(JSON.parse(fs.readFileSync(path.join(__dirname, './keyboard-layouts/' + keyboardsDB[req.params.URLCode][4] + ''))));
        } else {
            res.status(300);
        }
    } else {
        res.status(400);
    }
});

// Retrieve all the Word Suggestions for all languages
router.get('/v1/multiscripteditor/AllSuggestionsWordList/suggestionWords', function(req, res, next) {
    const dateForLogging = new Date().toISOString()
    console.info(`[MULTISCRIPTEDITOR] ${dateForLogging} Validating Token before retrieving all the Word Suggestions for all languages`);
    if (ValidateToken(req).iss === properties.get('token.self.bearer')) {
        let allSuggestions = [];
        for(let langCode in supportedLanguages) {
            let suggestionWordList = JSON.parse(fs.readFileSync(path.join(__dirname, './suggestionWords/' + keyboardsDB[supportedLanguages[langCode]][2].toLowerCase() + '.json')));
            allSuggestions.push({"language" : keyboardsDB[supportedLanguages[langCode]][2], "suggestions" : suggestionWordList});
        }
        if (allSuggestions != []) {
            //res.send("List of Suggested Words in Supported Languages are shared");
            res.send(allSuggestions);
            res.status(200);
        } else {
            res.sendStatus("No Supported Languages");
            res.status(300);
        }
    } else {
        res.status(400);
    }
});

// Retrieve all the Word Suggestions for a particular script or language
router.get('/v1/multiscripteditor/GetWordsList/:Locale/suggestionWords', function(req, res, next) {
    const dateForLogging = new Date().toISOString()
    console.info(`[MULTISCRIPTEDITOR] ${dateForLogging} Validating Token before providing Word Suggestions for `, req.params.Locale);
    if (ValidateToken(req).iss === properties.get('token.self.bearer')) {
        if (supportedLanguages.indexOf(req.params.Locale) > -1) {
            let suggestionWordList = [];
            try {
                let language_name = keyboardsDB[req.params.Locale][2].toLowerCase();
                language_name = (language_name.indexOf(" ") > -1) ? language_name.split(" ")[0] : language_name;
                language_name = (language_name.indexOf("(") > -1 && req.params.Locale != "zhcn" && req.params.Locale != "zhtw") ? language_name.split("(")[0] : language_name;
                suggestionWordList = JSON.parse(fs.readFileSync(path.join(__dirname, './suggestionWords/' + language_name + '.json')));
            } catch (error) {
                console.error(`[MULTISCRIPTEDITOR] Word Suggestions file for ${req.params.Locale} does not exist `, error);
            }
            if (suggestionWordList) {
                res.status(200);
                res.send(suggestionWordList);
            } else {
                res.send("No Supported Language Exist");
                res.status(500);
            }
        } else {
            res.send("Not a Supported Language");
            res.status(300);
        }
    } else {
        res.status(400);
    }
});

/*
    0 - Abjad
    1 - Alphabet
    2 - Abugida
    3 - Syllabery
    4 - Ideogram-Logogram-Pictogram
    5 - Braille
    6 - Sign
    7 - Others
    8 - Unclassified
*/
// Get all Scripts of a particular Script Type in the Supported Language
router.get('/v1/multiscripteditor/keyboard/:Type/InSupportedLanguage/:UILocale', function(req, res, next) {
    const dateForLogging = new Date().toISOString()
    console.info(`[MULTISCRIPTEDITOR] ${dateForLogging} Validating Token before retrieving all Scripts of a particular Script Type ${req.params.Type} for ${req.params.UILocale}`);
    if (ValidateToken(req).iss === properties.get('token.self.bearer')) {
        if (keyboardsDB && translationSupportedLanguages.indexOf(req.params.UILocale) > -1 && req.params.Type && parseInt(req.params.Type) >= 0 && parseInt(req.params.Type) <= 8) {
            // Return all the languages/scripts of a particular script type
            const translationKeyboardsDB = JSON.parse(fs.readFileSync(path.join(__dirname, './keyboard-layouts/keysboards-layouts_' + req.params.UILocale + '.json')));
            let allScriptNames = "";
            for (let key in translationKeyboardsDB) {
                if (translationKeyboardsDB[key][0] == parseInt(req.params.Type))
                    allScriptNames = allScriptNames + translationKeyboardsDB[key][2] + ", ";
            }
            res.send(allScriptNames);
            res.status(200);
        } else {
            res.status(300);
        }
    } else {
        res.status(400);
    }
});

// Get all Endonym Scripts Name of a particular Script Type
router.get('/v1/multiscripteditor/keyboardsWith/:Type/EndonymName', function(req, res, next) {
    const dateForLogging = new Date().toISOString()
    console.info(`[MULTISCRIPTEDITOR] ${dateForLogging} Validating Token before retrieving all Scripts of a particular Script Type ${req.params.Type}`);
    if (ValidateToken(req).iss === properties.get('token.self.bearer')) {
        if (keyboardsDB && req.params.Type && parseInt(req.params.Type) >= 0 && parseInt(req.params.Type) <= 8) {
            // Return all the languages/scripts of a particular script type
            let allScriptNames = "";
            for (let key in keyboardsDB) {
                if (keyboardsDB[key][0] == parseInt(req.params.Type))
                    allScriptNames = allScriptNames + keyboardsDB[key][5] + ", ";
            }
            res.send(allScriptNames);
            res.status(200);
        } else {
            res.status(300);
        }
    } else {
        res.status(400);
    }
});

// Return all Languages that use Latin Alphabet in the Supported Language
router.get('/v1/multiscripteditor/languages/latin/InSupportedLanguage/:UILocale', function(req, res, next) {
    const dateForLogging = new Date().toISOString()
    console.info(`[MULTISCRIPTEDITOR] ${dateForLogging} Validating Token before retrieving all Language that user Latin Alphabet for ${req.params.UILocale}`);
    if (ValidateToken(req).iss === properties.get('token.self.bearer')) {
        if (keyboardsDB && translationSupportedLanguages.indexOf(req.params.UILocale) > -1) {
            res.status(200);
            // Return all the languages/scripts that use Latin alphabets
            const translationKeyboardsDB = JSON.parse(fs.readFileSync(path.join(__dirname, './keyboard-layouts/keysboards-layouts_' + req.params.UILocale + '.json')));
            let allLanguageNames = "";
            for (let key in translationKeyboardsDB) {
                if (translationKeyboardsDB[key][0] == 1 && translationKeyboardsDB[key][1] == 0)
                    allLanguageNames = allLanguageNames + translationKeyboardsDB[key][2] + ", ";
            }
            res.send(allLanguageNames);
        } else {
            res.status(300);
        }
    } else {
        res.status(400);
    }
});

// Return all Endonym Names of Languages that use Latin Alphabet
router.get('/v1/multiscripteditor/languages/latin/EndonymName', function(req, res, next) {
    const dateForLogging = new Date().toISOString()
    console.info(`[MULTISCRIPTEDITOR] ${dateForLogging} Validating Token before retrieving all Endonym Language Names that user Latin Alphabet`);
    if (ValidateToken(req).iss === properties.get('token.self.bearer')) {
        if (keyboardsDB) {
            res.status(200);
            // Return all the languages/scripts that use Latin alphabets
            let allLanguageNames = "";
            for (let key in keyboardsDB) {
                if (keyboardsDB[key][0] == 1 && keyboardsDB[key][1] == 0)
                    allLanguageNames = allLanguageNames + keyboardsDB[key][5] + ", ";
            }
            res.send(allLanguageNames);
        } else {
            res.status(300);
        }
    } else {
        res.status(400);
    }
});

// Get all Languages/Scripts of the Keyboards Layout type : Typewriter / QWERTY in the Supported Language
router.get('/v1/multiscripteditor/keyboardsOf/typewriter/InSupportedLanguage/:UILocale', function(req, res, next) {
    const dateForLogging = new Date().toISOString()
    console.info(`[MULTISCRIPTEDITOR] ${dateForLogging} Validating Token before retrieving all Languages/Scripts of the Typewriter / QWERTY type for ${req.params.UILocale}`);
    if (ValidateToken(req).iss === properties.get('token.self.bearer')) {
        if (keyboardsDB && translationSupportedLanguages.indexOf(req.params.UILocale) > -1) {
            // Return all the languages/scripts of keyboard layout - typewriter
            let qwertyKeyboards = "";
            const translationKeyboardsDB = JSON.parse(fs.readFileSync(path.join(__dirname, './keyboard-layouts/keysboards-layouts_' + req.params.UILocale + '.json')));
            for (let urlcode in allQwertyKeyboards) {
                qwertyKeyboards = qwertyKeyboards + translationKeyboardsDB[allQwertyKeyboards[urlcode]][2] + ", "
            }
            res.send(qwertyKeyboards);
            res.status(200);
        } else {
            res.status(300);
        }
    } else {
        res.status(400);
    }
});

// Get all Endonym Names Languages/Scripts of the Keyboards Layout type : Typewriter / QWERTY
router.get('/v1/multiscripteditor/keyboardsIn/typewriter/EndonymName', function(req, res, next) {
    const dateForLogging = new Date().toISOString()
    console.info(`[MULTISCRIPTEDITOR] ${dateForLogging} Validating Token before retrieving all Endonym Languages/Scripts names of the Typewriter / QWERTY type`);
    if (ValidateToken(req).iss === properties.get('token.self.bearer')) {
        if (keyboardsDB) {
            // Return all the languages/scripts of keyboard layout - typewriter
            let qwertyKeyboards = "";
            for (let urlcode in allQwertyKeyboards) {
                qwertyKeyboards = qwertyKeyboards + keyboardsDB[allQwertyKeyboards[urlcode]][5] + ", "
            }
            res.send(qwertyKeyboards);
            res.status(200);
        } else {
            res.status(300);
        }
    } else {
        res.status(400);
    }
});

// Get all Languages/Scripts of the Keyboards Layout type : Transliteration in the Supported Language
router.get('/v1/multiscripteditor/keyboardsOf/transliterate/InSupportedLanguage/:UILocale', function(req, res, next) {
    const dateForLogging = new Date().toISOString()
    console.info(`[MULTISCRIPTEDITOR] ${dateForLogging} Validating Token before retrieving all Languages/Scripts of the Transliteration type for ${req.params.UILocale}`);
    if (ValidateToken(req).iss === properties.get('token.self.bearer')) {
        if (keyboardsDB && translationSupportedLanguages.indexOf(req.params.UILocale) > -1) {
            // Return all the languages/scripts of keyboard layout - transliterate
            let transliterateKeyboards = "";
            const translationKeyboardsDB = JSON.parse(fs.readFileSync(path.join(__dirname, './keyboard-layouts/keysboards-layouts_' + req.params.UILocale + '.json')));
            for (let urlcode in allTransliterateKeyboards) {
                transliterateKeyboards = transliterateKeyboards + translationKeyboardsDB[allTransliterateKeyboards[urlcode]][2] + ", "
            }
            res.send(transliterateKeyboards);
            res.status(200);
        } else {
            res.status(300);
        }
    } else {
        res.status(400);
    }
});

// Get all Endonym Names Languages/Scripts of the Keyboards Layout type : Transliteration
router.get('/v1/multiscripteditor/keyboardsIn/transliterate/EndonymName', function(req, res, next) {
    const dateForLogging = new Date().toISOString()
    console.info(`[MULTISCRIPTEDITOR] ${dateForLogging} Validating Token before retrieving all Endonym Languages/Scripts Names of the Transliteration type`);
    if (ValidateToken(req).iss === properties.get('token.self.bearer')) {
        if (keyboardsDB) {
            // Return all the languages/scripts of keyboard layout - transliterate
            let transliterateKeyboards = "";
            for (let urlcode in allTransliterateKeyboards) {
                transliterateKeyboards = transliterateKeyboards + keyboardsDB[allTransliterateKeyboards[urlcode]][5] + ", "
            }
            res.send(transliterateKeyboards);
            res.status(200);
        } else {
           res.status(300);
        }
    } else {
        res.status(400);
    }
});

// Collect all Sessions Data of the Website 
router.get('/v1/multiscripteditor/allSessionData', function(req, res, next) {
    // Implement Patron Idea : Auth & Validity
    if (ValidateToken(req).iss === properties.get('token.self.bearer')) {
        if (collectionOfSessionInfo) {
            res.status(200);
            res.send(collectionOfSessionInfo);
        } else {
            res.status(500);
        }
    } else {
        res.status(400);
    }
});

// Get the Transliteration for a Target script type of the Written content
router.post('/v1/multiscripteditor/integratedTransliteration/:targetScript', function(req, res, next) {
    // Implement Patron Idea : Auth & Validity
    if (ValidateToken(req).iss === properties.get('token.self.bearer')) {
        if (req && req.params.targetScript) {
            let urlForRequest = `https://aksharamukha-plugin.appspot.com/api/public?target=${req.params.targetScript}&text=${req.body.content}`;
            res.status(200);
            res.send(urlForRequest);
        } else {
            res.status(500);
        }
    } else {
        res.status(400);
    }
});

// Gather a Session's Information
router.put('/v1/multiscripteditor/collectingData', function(req, res, next) {
    // Only Allowed with a Valid auto generated SessionID/Token
    const dateForLogging = new Date().toISOString()
    console.info(`[MULTISCRIPTEDITOR] ${dateForLogging} Request Collecting Initial Session Data `, req.body);
    if (ValidateToken(req).iss === properties.get('token.self.bearer')) {
        if (collectionOfSessionInfo && req.body) {
            req.body.sessionCounter = collectionOfSessionInfo.length + 1;
            collectionOfSessionInfo.push(req.body);
            res.status(200);
            res.send(req.body);
            fs.writeFileSync(path.join(__dirname, './session-info/session-info.json'), JSON.stringify(collectionOfSessionInfo));
        } else {
            res.status(500);
        }
    } else {
        res.status(400);
    }
});

// Automated method to include new words for any language after being parsed
router.put('/v1/multiscripteditor/sentenceParsing', function(req, res, next) {
    // Sentence parsing using Python NLP - Stanza for determining parts of a sentence in any language
    const dateForLogging = new Date().toISOString()
    console.info(`[MULTISCRIPTEDITOR] ${dateForLogging} NLP of a Statement in a Language `, req.body);
    fs.stat(path.join(__dirname, './nlpOnNode/nlpNode.py'), function(err) {
        if(err == null) {
            if (ValidateToken(req).iss === properties.get('token.self.bearer')) {
                if (req.body && req.body.sentence && req.body.sentence != "") {
                    let language = req.body.language;
                    let locale = req.body.locale;
                    let sentence = req.body.sentence;
                    let sentenceMarker = req.body.sentenceMarker;

                    if(Object.getOwnPropertyNames(mappingForAdditionalLocales).indexOf(locale) > -1) {
                        locale = mappingForAdditionalLocales[locale];
                    }
                    if (language.indexOf("(") > -1 && locale != "zhcn" && locale != "zhtw") {
                        language = language.split("(")[0];
                    }

                    const nlpForNode = spawn('python3', [path.join(__dirname, './nlpOnNode/nlpNode.py'), locale, language, sentence, sentenceMarker]);

                    nlpForNode.stdout.on('data', (data) => {
                        // Once the NLP is completed from Python side, then ensure to complete this copy process to synchronise data for Client-side
                        let suggestedWordSetForLanguage = []
                        try {
                            suggestedWordSetForLanguage = JSON.parse(fs.readFileSync(path.join(__dirname, './suggestionWords/' + language.toLowerCase() + '.json')));
                        } catch (error) {
                            console.error(`[MULTISCRIPTEDITOR] Word Suggestions file for ${language} does not exist `, error);
                        }
                                            
                        let newWords = {};
                        // Supported & Processed Language included ⌘ while the Unsupported supported languages will have Word Separator
                        let currentSeparator = ""
                        if (locale == "la") 
                            currentSeparator = "·";
                        else if (locale == "geez")
                            currentSeparator = "፡";
                        else if (noSeparator.indexOf(locale) > -1)
                            currentSeparator = "";
                        else if (visualSeparator.indexOf(locale) > -1)
                            currentSeparator = "\u2009";
                        else if (syllabicSeparator.indexOf(locale) > -1)
                            currentSeparator = " ";
                        else if (zeroWidthSeparator.indexOf(locale) > -1)
                            currentSeparator = "\u202F";
                        else
                            currentSeparator = " ";

                        let suggestions = [];
                        
                        if (data && data.toString().indexOf("⌘") > -1) {
                            // NLP Stanza processed and updating Suggestion List
                            suggestions = data.toString().split("⌘");
                            for (let i = 0 ; i < suggestions.length ; i++) {
                                if (wordSeparators.indexOf(suggestions[i]) == -1) {
                                    newWords["" + language.toLowerCase() + ""] = suggestions[i];
                                    if(suggestedWordSetForLanguage && _isContains(suggestedWordSetForLanguage, suggestions[i]) == false) {
                                        suggestedWordSetForLanguage.push(newWords);
                                    } else if (suggestedWordSetForLanguage == []) {
                                        suggestedWordSetForLanguage.push(newWords);
                                    }
                                    newWords = {};
                                }
                            }
                        } else if (data && data.toString().indexOf(currentSeparator) > -1) {
                            // Non-supported NLP Stanza language updating Suggestion List
                            suggestions = data.toString().split(currentSeparator);
                            for (let i = 0 ; i < suggestions.length ; i++) {
                                if (wordSeparators.indexOf(suggestions[i]) == -1) {
                                    newWords["" + language.toLowerCase() + ""] = suggestions[i];
                                    if(suggestedWordSetForLanguage && _isContains(suggestedWordSetForLanguage, suggestions[i]) == false) {
                                        suggestedWordSetForLanguage.push(newWords);
                                    } else if (suggestedWordSetForLanguage == []) {
                                        suggestedWordSetForLanguage.push(newWords);
                                    }
                                    newWords = {};
                                }
                            }
                        } else if (data) {
                            // Non-supported language
                            suggestions = data.toString();
                            if (wordSeparators.indexOf(suggestions) == -1) {
                                newWords["" + language.toLowerCase() + ""] = suggestions;
                                if(suggestedWordSetForLanguage && _isContains(suggestedWordSetForLanguage, suggestions) == false) {
                                    suggestedWordSetForLanguage.push(newWords);
                                } else if (suggestedWordSetForLanguage == []) {
                                    suggestedWordSetForLanguage.push(newWords);
                                }
                                newWords = {};
                            }
                        }
                    
                        //let uniqueSuggestions = [...new Set(suggestedWordSetForLanguage.map(item => item["" + language + ""]))];
                        //let uniqueSuggestions = [...new Map(suggestedWordSetForLanguage.map((x) => [x["" + language + ""], x])).values()];
                        
                        // Regular reloading of the Suggestion Words JSON file is done from Client-side via REST-API requests
                        // Unsupported supported languages or where the suggestions do not exist so far
                        fs.writeFileSync(path.join(__dirname, './suggestionWords/' + language.toLowerCase() + '.json'), JSON.stringify(suggestedWordSetForLanguage));

                        res.status(200);
                        res.send(data);
                    });

                    nlpForNode.stderr.on('data', (data) => {
                        console.info(`spawn stderr: ${data}`);
                    });

                    nlpForNode.on('close', (code) => {
                        console.info(`[MULTISCRIPTEDITOR] Spawn child process exited with code ${code}`);
                    });
                } else {
                    res.status(300);
                }
            } else {
                res.status(400);
            }
        } else if (err.code === 'ENOENT') {
            // file does not exist
            res.status(500);
        }
    });
});

// Converting an Image To Text and Returning back
router.post('/v1/multiscripteditor/convertImage2Text', function(req, res, next) {
    const dateForLogging = new Date().toISOString();
    console.info(`[MULTISCRIPTEDITOR] ${dateForLogging} Converting an Image To Text`);
    fs.stat(path.join(__dirname, './image2text/convertimage2text.py'), function(err) {
        if(err == null) {
            if (ValidateToken(req).iss === properties.get('token.self.bearer')) {
                if (req.body && req.body.type && req.body.languages && req.body.dataImageOrURL) {
                    let typeOfUpload = req.body.type;
                    let languagesInImage = req.body.languages;
                    let imageData = req.body.dataImageOrURL;
                    var codesForEasyOCR = [];
                    for(let language in languagesInImage) {
                        codesForEasyOCR.push(languagesInImage[language]["code"]);
                    }
                    const fileTimeStamp = dateForLogging.replace(/:/g,"-");
                    console.info(`[MULTISCRIPTEDITOR] ${dateForLogging} Converting an Image To Text `, typeOfUpload, languagesInImage)
                    if (typeOfUpload == "url") {
                        console.info(`[MULTISCRIPTEDITOR] ${dateForLogging} Converting an Image To Text URL `, imageData, codesForEasyOCR.toString());
                        exec('curl -o ' + path.join(__dirname, `./image2text/image_${fileTimeStamp}.png`) + ' ' + imageData, function (error, stdout, stderr) {
                            console.log('stdout: ' + stdout);
                            console.log('stderr: ' + stderr);
                            if (error !== null) {
                                console.log('exec error: ' + error);
                            } else {
                                const image2TextOnNode = spawn('python3', [path.join(__dirname, './image2text/convertimage2text.py'), typeOfUpload, codesForEasyOCR.toString(), path.join(__dirname, `./image2text/image_${fileTimeStamp}.png`)]);

                                image2TextOnNode.stdout.on('data', (data) => {
                                    res.status(200);
                                    res.send(data);
                                });

                                image2TextOnNode.stderr.on('data', (data) => {
                                    console.info(`spawn stderr: ${data}`);
                                });

                                image2TextOnNode.on('close', (code) => {
                                    console.info(`[MULTISCRIPTEDITOR] Spawn child process exited with code ${code}`);
                                    fs.stat(path.join(__dirname, `./image2text/image_${fileTimeStamp}.png`), function(err) {
                                        if (err == null)
                                            fs.unlinkSync(path.join(__dirname, `./image2text/image_${fileTimeStamp}.png`));
                                    });
                                });
                            }
                        });
                    } else if (typeOfUpload == "file") {
                        console.info(`[MULTISCRIPTEDITOR] ${dateForLogging} Converting an Image To Text File `);
                        var base64ImageData = imageData.replace(/^data:image\/png;base64,/, "");
                        require("fs").writeFile(path.join(__dirname, `./image2text/image_${fileTimeStamp}.png`), base64ImageData, 'base64', function(err) {
                            if (err == null) {
                                const image2TextOnNode = spawn('python3', [path.join(__dirname, './image2text/convertimage2text.py'), typeOfUpload, codesForEasyOCR.toString(), path.join(__dirname, `./image2text/image_${fileTimeStamp}.png`)]);

                                image2TextOnNode.stdout.on('data', (data) => {
                                    res.status(200);
                                    res.send(data);
                                });

                                image2TextOnNode.stderr.on('data', (data) => {
                                    console.info(`spawn stderr: ${data}`);
                                });

                                image2TextOnNode.on('close', (code) => {
                                    console.info(`[MULTISCRIPTEDITOR] Spawn child process exited with code ${code}`);
                                    fs.stat(path.join(__dirname, `./image2text/image_${fileTimeStamp}.png`), function(err) {
                                        if (err == null)
                                            fs.unlinkSync(path.join(__dirname, `./image2text/image_${fileTimeStamp}.png`));
                                    });
                                });
                            } else {
                                console.log(err);
                            }
                        });
                    }
                } else {
                    res.status(300);
                }
            } else {
                res.status(400);
            }
        } else if (err.code === 'ENOENT') {
            // file does not exist
            res.status(500);
        }
    });
});

// Backup process for Session-Info JSON file : Maximum 3MB
fs.stat(path.join(__dirname, './session-info', 'session-info.json'), (err, stats) => {
    if (err) {
        console.info(`[MULTISCRIPTEDITOR] File - session-info.json doesn't exist`);
    } else {
        var fileSizeInBytes = stats.size;
        var fileSizeInMegabytes = fileSizeInBytes / (1024*1024);
        if (fileSizeInMegabytes >= 3) {
            // Backup existing file with timestamp of "now" 
            let now = new Date().toISOString();
            now = now.replace(":", "-").replace(":", "-").replace(".", "_");
            fs.copyFileSync(path.join(__dirname, './session-info', 'session-info.json'), path.join(__dirname, './session-info', 'session-info_' + now + '.json'));
            console.info(`[MULTISCRIPTEDITOR] Session-Info file refreshed at ${now}`)
            // Clear the existing file
            fs.writeFile(path.join(__dirname, './session-info', 'session-info.json'), JSON.stringify({}), (error) => {
                if (error)
                    console.error("[MULTISCRIPTEDITOR] Issue with File ", error);
            });
        }
    }
});

// Backup process for MultiScriptEditor Log file : Maximum 5MB
fs.stat(path.join(__dirname, './logs', 'MultiScriptEditor.log'), (err, stats) => {
    if (err) {
        console.info(`[MULTISCRIPTEDITOR] File MultiScriptEditor.log doesn't exist`);
    } else {
        var fileSizeInBytes = stats.size;
        var fileSizeInMegabytes = fileSizeInBytes / (1024*1024);
        var fileContents = fs.readFileSync(path.join(__dirname, './logs', 'MultiScriptEditor.log'));
        if (fileSizeInMegabytes >= 5000) {
            // Backup existing file with timestamp of "now"
            let now = new Date().toISOString();
            now = now.replace(":", "-").replace(":", "-").replace(".", "_");
            fs.copyFileSync(path.join(__dirname, './logs', 'MultiScriptEditor.log'), path.join(__dirname, './logs', 'MultiScriptEditor' + now + '.log'));
            // Clear the existing file
            fs.writeFile(path.join(__dirname, './logs', 'MultiScriptEditor.log'), `[MULTISCRIPTEDITOR] Log file has been refreshed at ${now}`, (error) => {
                if (error)
                    console.error("[MULTISCRIPTEDITOR] Issue with File ", error);
            });
        }
    }
});

const keyPath = path.join(__dirname, `${properties.get('ssl.key.path')}`);
const certPath = path.join(__dirname, `${properties.get('ssl.cert.path')}`);

// set up a config object
var server_config = {
    key : fs.readFileSync(keyPath, 'utf8'), // file location of private key
    cert: fs.readFileSync(certPath, 'utf8') // file location of SSL cert
};

// create the HTTPS server on port 5555
var https_server = https.createServer(server_config, appSSL).listen(portSSL, function(err){
    console.info(`[MULTISCRIPTEDITOR] Node.js Express HTTPS Server Listening on Port ${portSSL}`);
});

/*var http_server = http.createServer(app).listen(port, function(err){
    console.info(`[MULTISCRIPTEDITOR] Node.js Express HTTP Server Listening on Port ${port}`);
});*/

// Fix for this problem : MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 exit listeners added. Use emitter.setMaxListeners() to increase limit
process.setMaxListeners(0);

app.use('/', router);
appSSL.use('/', router);