const mailer = require('../index')
const dotenv = require('dotenv')

describe("Testing mailer", function(){

    dotenv.config()

    it("should send test mail", function(){
	let data = {
	    from: 'Mailgun postmaster <'+process.env.POSTMASTER+'>',
	    to: process.env.TO,
	    subject: 'Hello',
	    text: 'Testing some Mailgun awesomeness!'
	}
	mailer.send(data, {
	    api_key: process.env.API_KEY,
	    domail: process.env.DOMAIN
	})
    })
})
