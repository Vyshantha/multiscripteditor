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
var collectionOfSessionInfo = JSON.parse(fs.readFileSync(path.join(__dirname, './session-info/session-info.json')));

// Words Suggestion for All Supported Languages
const supportedLanguages = ['af','am','ar','az','bak','be','befr','bg','bn','bopo','br','brah','bs','bsk','ca','ceb','co','cs','cy','da','de','el','en','engb','enin','enintl','enus','eo','es','esmx','et','eu','fa','fi','fj','fo','fr','frca','fy','ga','gd','gl','gn','goth','gu','gv','ha','haw','he','hi','hmn','hr','ht','hu','hy','id','ig','ilo','is','it','ja','jv','ka','kk','km','kn','ko','kom','kon','ku','kw','ky','la','lb','lfn','ln','lo','lt','lv','mg','mi','mk','ml','mn','mr','ms','mt','my','nag','ne','nl','nld','no','ny','nya','oji','or','pa','pin','pl','ps','pt','ptbr','qu','rn','ro','rom','ru','rw','sa','sank','sd','si','sk','sl','sm','sn','so','sq','sr','st','su','sun','sv','sw','ta','te','tfng','tg','th','tk','tl','tpi','tr','tt','ty','ug','uk','ur','uz','vi','xh','yi','yo','zhcn','zhtw','zu'];

const mappingForAdditionalLocales = {'enintl':'en', 'enin':'en', 'engb':'en', 'enus':'en', 'nld':'nl', 'esmx':'es', 'ptbr':'pt', 'befr':'fr', 'frca':'fr'};

// All Supported UI Locales
const translationSupportedLanguages = ['af','am','ar','az','be','bg','bn','bs','ca','ceb','co','cs','cy','da','de','el','en','eo','es','et','eu','fa','fi','fr','fy','ga','gd','gl','gu','ha','haw','he','hi','hmn','hr','ht','hu','hy','id','ig','is','it','ja','jv','ka','kk','km','kn','ko','ku','ky','la','lb','lo','lt','lv','mg','mk','ml','mn','mr','ms','mt','my','ne','nl','no','ny','or','pa','pl','ps','pt','ro','ru','rw','sa','sank','sd','si','sk','sl','sm','sn','so','sq','sr','st','su','sv','sw','ta','te','tg','th','tk','tl','tr','tt','ug','uk','ur','uz','vi','xh','yi','yo','zhcn','zhtw','zu'];

const allQwertyKeyboards = ["ace", "adlm", "iai", "af", "ak", "sq", "gsw", "am", "njo", "ar", "an", "hy", "as", "ast", "az", "aze", "bjn", "ban", "bm", "bak", "eu", "bar", "be", "befr", "bn", "tfng", "bharati", "bcl", "bis", "brx", "brxla", "bopo", "bs", "bsla", "brah", "iub", "br", "bug", "bugla", "bg", "cans", "ca", "ceb", "cakm", "ch", "cher", "zhcn", "zhtw", "cjk", "kw", "co", "hr", "cs", "dgabf", "dgagh", "dag", "da", "de", "din", "nl", "dz", "bin", "engb", "enin", "enintl", "enus", "eo", "et", "eurkey", "evncy", "ee", "fo", "fa", "fj", "fi", "fon", "latf", "fr", "frca", "fy", "ff", "fur", "gd", "gag", "gl", "gall", "geez", "ka", "gor", "el", "kl", "apu", "gn", "gu", "ht", "haj", "ko", "rohg", "ha", "haw", "he", "hi", "hira", "hmn", "hu", "is", "ig", "ilo", "hil", "id", "esi", "iu", "esk", "ipa", "ga", "it", "jam", "jv", "lad", "ladla", "kbp", "ja", "pam", "csb", "kata", "kaz", "kk", "kha", "km", "ki", "rw", "gil", "rn", "kon", "ko", "ku", "ky", "lbj", "lld", "lo", "ltg", "la", "lv", "lij", "li", "ln", "lis", "lt", "liv", "lmo", "lg", "lb", "lwo", "mk", "mad", "mg", "ms", "ml", "mt", "malt", "mnc", "mnk", "mni", "gv", "mi", "mrw", "mr", "mh", "masu", "mfe", "mic", "min", "mwl", "lus", "mn", "mnla", "mon", "mos", "my", "nag", "na", "nv", "nde", "nap", "nia", "jpn", "njz", "nkoo", "nrf", "no", "ny", "oc", "or", "oira", "olck", "om", "osge", "osma", "pau", "pln", "pag", "pap", "ps", "phag", "pms", "pin", "pl", "pt", "ptbr", "pa", "kaa", "rally", "ranj", "rom", "ro", "ru", "se", "sm", "sgs", "iast", "sa", "srm", "sc", "nds", "sr", "st", "tn", "crs", "sii", "sn", "scu", "sd", "si", "ss", "sk", "sl", "so", "sora", "wen", "es", "esmx", "sun", "sw", "sv", "gsw", "syrc", "tl", "ty", "tale", "talu", "tg", "ta", "tt", "te", "tdt", "thaa", "th", "tibt", "tig", "ti", "tpi", "tokp", "to", "tso", "tr", "tk", "tuk", "uk", "ur", "ipk", "ug", "uz", "uzb", "ven", "vec", "vi", "wym", "wa", "war", "cy", "wo", "xh", "sah", "yi", "bjyo", "ngyo", "zza", "zu"];

const allTransliterateKeyboards = ['as', 'bn', 'brx', 'gu', 'haj', 'hi', 'kn', 'ml', 'malt', 'mr', 'or', 'pa', 'sa', 'ta', 'te', 'ur', 'tirh', 'mni', 'hy', 'bg', 'km'];

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
appSSL.use(bodyParser.json());
appSSL.use(bodyParser.urlencoded({extended: true}));
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

app.use(express.static(path.join(__dirname + './../views')));
app.set('views', path.join(__dirname + './../views'));
app.set('view engine', 'html');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", `https://${properties.get('client.app.hostname')}:${properties.get('client.angular.port')}`);
    res.header("Access-Control-Allow-Credentials", false);
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
    next();
});

router.get('/', function(req, res){
    res.sendFile('favicon.ico', {root : __dirname + './../views'});
});

router.get('/fav', function(req, res){
    res.sendFile('favicon.png', {root : __dirname + './../views'});
});

router.get('/v1/multiscripteditor', function(req, res){
    res.sendFile('index.html', {root : __dirname + './../views'});
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
router.get('/v1/multiscripteditor/keyboard/:Type/EndonymName', function(req, res, next) {
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
router.get('/v1/multiscripteditor/keyboard/typewriter/InSupportedLanguage/:UILocale', function(req, res, next) {
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
router.get('/v1/multiscripteditor/keyboard/typewriter/EndonymName', function(req, res, next) {
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
router.get('/v1/multiscripteditor/keyboard/transliterate/InSupportedLanguage/:UILocale', function(req, res, next) {
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
router.get('/v1/multiscripteditor/keyboard/transliterate/EndonymName', function(req, res, next) {
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
    fs.stat(path.join(__dirname, './../nlpOnNode/nlpNode.py'), function(err) {
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

                    const nlpForNode = spawn('python3', [path.join(__dirname, './../nlpOnNode/nlpNode.py'), locale, language, sentence, sentenceMarker]);

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
fs.stat(path.join(__dirname, './../logs', 'MultiScriptEditor.log'), (err, stats) => {
    if (err) {
        console.info(`[MULTISCRIPTEDITOR] File MultiScriptEditor.log doesn't exist`);
    } else {
        var fileSizeInBytes = stats.size;
        var fileSizeInMegabytes = fileSizeInBytes / (1024*1024);
        var fileContents = fs.readFileSync(path.join(__dirname, './../logs', 'MultiScriptEditor.log'));
        if (fileSizeInMegabytes >= 5000) {
            // Backup existing file with timestamp of "now"
            let now = new Date().toISOString();
            now = now.replace(":", "-").replace(":", "-").replace(".", "_");
            fs.copyFileSync(path.join(__dirname, './../logs', 'MultiScriptEditor.log'), path.join(__dirname, './../logs', 'MultiScriptEditor' + now + '.log'));
            // Clear the existing file
            fs.writeFile(path.join(__dirname, './../logs', 'MultiScriptEditor.log'), `[MULTISCRIPTEDITOR] Log file has been refreshed at ${now}`, (error) => {
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