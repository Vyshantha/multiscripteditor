process.argv.forEach(function (val, index, array) { 
    var arg = val.split("="); if (arg.length > 0) { 
        if (arg[0] === 'environments') { 
            var env = require('./environments/' + arg[1] + '.properties'); 
            module.exports = env; 
        } 
    }
});