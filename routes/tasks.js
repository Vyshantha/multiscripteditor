var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var http = require('http');
var https = require('https');
var fs = require('fs');
var path = require('path');

const SignedToken = require('./jwt_utils').signedToken;
const ValidateToken = require('./jwt_utils').validateToken;

var portSSL = 5555 || process.env.PORT;

var app = express();
var appSSL = express();
var router = express.Router();

var keyboardsDB = JSON.parse(fs.readFileSync(path.join(__dirname, './keyboard-layouts/keysboards-layouts.json')));
var collectionOfSessionInfo = JSON.parse(fs.readFileSync(path.join(__dirname, './session-info/session-info.json')));

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
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static(path.join(__dirname, './../editorClient/src')));
//app.use(express.static(path.join(__dirname, './../editorClient/dist/editorClient')));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.get('/', function(req, res){
    res.render('./../views/index.html');
});

// Retrieve the Keyboard Layouts DB
router.get('/v1/multiscripteditor/retrieveKeyboardsDB', function(req, res, next) {
    if (keyboardsDB) {  
        res.status(200);
        res.send(keyboardsDB);
    } else {
        res.status(400);
        //res.send(err);
    }
});

// Retrieve the Keyboards Properties
router.get('/v1/multiscripteditor/:URLCode/properties', function(req, res, next) {
    if (keyboardsDB && req.params.URLCode) {
        res.status(200);
        res.send(keyboardsDB[req.params.URLCode]);
    } else {
        res.status(400);
        //res.send(err);
    }
});

// Retrieve the Keyboards Layout
router.get('/v1/multiscripteditor/:URLCode/keyboardLayout', function(req, res, next) {
    if (keyboardsDB && req.params.URLCode) {
        res.status(200);
        res.send(JSON.parse(fs.readFileSync(path.join(__dirname, './keyboard-layouts/' + keyboardsDB[req.params.URLCode][4] + ''))));
    } else {
        res.status(400);
        //res.send(err);
    }
});

// Get all Languages/Scripts of a particular Script Type
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
router.get('/v1/multiscripteditor/keyboard/:Type', function(req, res, next) {
    if (keyboardsDB && req.params.Type) {
        res.status(200);
        // Return all the languages/scripts of a particular script type
        res.send('');
    } else {
        res.status(400);
        //res.send(err);
    }
});

// Return all Languages/Scripts that Use Latin Alphabets
router.get('/v1/multiscripteditor/keyboard/latin', function(req, res, next) {
    if (keyboardsDB && req.params.URLCode) {
        res.status(200);
        // Return all the languages/scripts that use Latin alphabets
        res.send('');
    } else {
        res.status(400);
        //res.send(err);
    }
});

// Get all Languages/Scripts of a particular the Keyboards Layout type
router.get('/v1/multiscripteditor/keyboard/typewriter', function(req, res, next) {
    if (keyboardsDB && req.params.URLCode) {
        res.status(200);
        // Return all the languages/scripts of keyboard layout - typewriter
        res.send('');
    } else {
        res.status(400);
        //res.send(err);
    }
});

// Get all Languages/Scripts of a particular the Keyboards Layout type
router.get('/v1/multiscripteditor/keyboard/transliterate', function(req, res, next) {
    if (keyboardsDB && req.params.URLCode) {
        res.status(200);
        // Return all the languages/scripts of keyboard layout - transliterate
        res.send('');
    } else {
        res.status(400);
        //res.send(err);
    }
});

// Collect the Session Data
router.get('/v1/multiscripteditor/allSessionData', function(req, res, next) {
    // Implement Patron Idea : Auth & Validity
    if (collectionOfSessionInfo) {
        res.status(200);
        res.send(collectionOfSessionInfo);
    } else {
        res.status(400);
        //res.send(err);
    }
});

// Gather a Session's Information
router.put('/v1/multiscripteditor/collectingData', function(req, res, next) {
    // Only Allowed with a Valid auto generated SessionID/Token
    if (collectionOfSessionInfo && req.body) {
        req.body.sessionCounter = collectionOfSessionInfo.length + 1;
        collectionOfSessionInfo.push(req.body);
        res.status(200);
        res.send(req.body);
        fs.writeFileSync(path.join(__dirname, './session-info/session-info.json'), JSON.stringify(collectionOfSessionInfo));
    } else {
        res.status(400);
        //res.send(err);
    }
});

const keyPath = path.join(__dirname, `key.pem`);
const certPath = path.join(__dirname, `server.crt`);

// set up a config object
var server_config = {
    key : fs.readFileSync(keyPath, 'utf8'), // file location of private key
    cert: fs.readFileSync(certPath, 'utf8') // file location of SSL cert
};

// create the HTTPS server on port 5555
var https_server = https.createServer(server_config, appSSL).listen(portSSL, function(err){
    console.log("Node.js Express HTTPS Server Listening on Port ", portSSL);
});

/*var http_server = http.createServer(app).listen(port, function(err){
    console.log("Node.js Express HTTP Server Listening on Port ", port);
});*/

// Fix for this problem : MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 exit listeners added. Use emitter.setMaxListeners() to increase limit
process.setMaxListeners(0);

app.use('/', router);
appSSL.use('/', router);