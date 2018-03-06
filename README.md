# Pingado-mailer

A nodemailer promise to use for nor notifications.

# Installing

    $ npm install pingado-mailer
    
## Testing

    $ git clone https://wwww.github.com/lunhg/pingado-mailer
    $ cd pingado-mailer && npm install
    $ npm test

## Usage

- Create a new instance if a mailer with provide api keys and domain:

    let mailer = require('pingado-mailer')(
    	api_key: <API_KEY>,
	domain: <DOMAIN>
    })
    
 - Now you can send mails as promises

    mailer.send({
	from: 'Mailgun postmaster <postmaster\@'+<DOMAIN>+'>',
	to: <TO>:,	  
	subject: 'Hello',
	text: 'Testing some Mailgun awesomeness!'
    }).then(function(body){
	console.log(body)
    }).catch(function(err){
	console.log(err)
    })