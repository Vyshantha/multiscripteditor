// Verify a JWT received for each REST API
// return valid or not?

const jwt = require('jsonwebtoken');
var path = require('path');
var fs = require('fs');
var PropertiesReader = require('properties-reader');

//const RSA_PRIVATE_KEY = fs.readFileSync(path.join(__dirname, `.`+ properties.get('token.auth.rsa') +``)); 
// Generated using this command : openssl genrsa -out rsa.key 1024 ; 
// Generated using http://travistidwell.com/jsencrypt/demo/ 1024 bit ; 
// Generate RSA Keys - https://csfieldguide.org.nz/en/interactives/rsa-key-generator/
// Generate Keys : https://qsandbox.com/tools/private-public-keygen

var properties = new PropertiesReader(path.join(__dirname, `./../env/sva_config.properties`));
const RSA_PUBLIC_KEY = fs.readFileSync(path.join(__dirname, `.`+ properties.get('token.public.key') +``)); 
const RSA_PRIVATE_KEY = fs.readFileSync(path.join(__dirname, `.`+ properties.get('token.private.key') +``)); 

module.exports = {
	validateToken : (req) => {
		var result;
		if (req.headers.authorization) {
			const token = req.headers.authorization.split(' ')[1];
			// verify signature - https://www.jsonwebtoken.io/ or https://jwt.io
			const options = {
                issuer: properties.get('token.self.bearer'),
                subject: properties.get('token.sign.subject'),
                audience: 'https://' + properties.get('main.app.hostname'),
	            expiresIn: req.headers.expiresIn,
				algorithm: [properties.get('token.rsa.algo')]
			};
			try {
		        // verify makes sure that the token hasn't expired and has been issued by us
		        result = jwt.verify(token, RSA_PUBLIC_KEY, options);

		        // Pass back the decoded token to the request object
		        //req.decoded = result;
		        // We call next to pass execution to the subsequent middleware
		        //next();
	      	} catch (err) {
	        	// Throw an error just in case anything goes wrong with verification
	        	throw new Error(err);
	      	}
		} else {
	      result = { 
	        error: `Authentication error. Token required.`,
	        status: 401
	      };
	      //res.status(401).send(result);
	    }
	    return result;
	},
	signedToken : (sessiontimeout) => {
		return jwt.sign({}, RSA_PRIVATE_KEY, {
            issuer: properties.get('token.self.bearer'),
            subject: properties.get('token.sign.subject'),
            audience: 'https://' + properties.get('main.app.hostname'),
            expiresIn: sessiontimeout,
            algorithm: properties.get('token.rsa.algo')
        });
	}
};