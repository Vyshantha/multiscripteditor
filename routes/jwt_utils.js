// Verify a JWT received for each REST API
// return valid or not?

const jwt = require('jsonwebtoken');
var path = require('path');
var fs = require('fs');
var PropertiesReader = require('properties-reader');
var properties = new PropertiesReader(path.join(__dirname, `./environments/sva_config.properties`));

const RSA_PUBLIC_KEY = fs.readFileSync(path.join(__dirname, `./${properties.get('token.public.key')}`), 'utf8'); 
const RSA_PRIVATE_KEY = fs.readFileSync(path.join(__dirname, `./${properties.get('token.private.key')}`), 'utf8'); 

module.exports = {
	validateToken : (req) => {
		var result;
		if (req.headers.authorization) {
			const token = req.headers.authorization.split(' ')[1];
			// verify signature - https://www.jsonwebtoken.io/ or https://jwt.io
			const options = {
                issuer: properties.get('token.self.bearer'),
				subject: properties.get('token.sign.subject'),
                audience: 'https://' + properties.get('server.app.hostname'),
	            expiresIn: req.headers.expiresIn,
				algorithm: ["" + properties.get('token.rsa.algo') + ""]
			};
			try {
		        // verify makes sure that the token hasn't expired and has been issued by us
		        result = jwt.verify(token, RSA_PUBLIC_KEY, options);
	      	} catch (err) {
				// Error: TokenExpiredError: jwt expired
				//if (err.name == "TokenExpiredError")
					// Renew Token - resend new "Create" Token from Client
	        	// Throw an error just in case anything goes wrong with verification
	        	throw new Error(err);
	      	}
		} else {
	      result = { 
	        error: `Inaccurate Token - Suspicious activity detected`
	      };
	    }
	    return result;
	},
	signedToken : () => {
		return jwt.sign({}, RSA_PRIVATE_KEY, {
            issuer: properties.get('token.self.bearer'),
            subject: properties.get('token.sign.subject'),
            audience: 'https://' + properties.get('server.app.hostname'),
            expiresIn: properties.get('token.expires.seconds'),
            algorithm: properties.get('token.rsa.algo')
        });
	}
};