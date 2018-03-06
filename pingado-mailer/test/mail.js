const path = require('path');
const dotenv = require('dotenv');

describe("Testing mailer", function(){

    let mailer = null;
    
    before(function(){
	dotenv.config({path:path.join(__dirname, '..', '.env')});
	mailer = require('../index')({
	    api_key: process.env.API_KEY,
	    domain: process.env.DOMAIN
	})
    })
    
    it("should send test mail", function(){
	return mailer.send({
	    from: 'Mailgun postmaster <postmaster\@'+process.env.DOMAIN+'>',
	    to: process.env.TO,
	    subject: 'Hello',
	    text: 'Testing some Mailgun awesomeness!'
	}).then(function(body){
	    console.log(body)
	}).catch(function(err){
	    console.log(err)
	})
    })
})
