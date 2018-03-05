mailgun = require('mailgun-js');

module.exports = {
    send: function(data, config){
	return new Promise(function(resolve, reject){
	    let mail = mailgun({apiKey: config.api_key, domain: config.domain});
	
	    mail.messages().send(data, function (err, body) {
		if(err) reject(err)
		resolve(body)
	    });
	})
    }
}
