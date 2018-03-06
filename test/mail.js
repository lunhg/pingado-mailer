const path = require('path');
const dotenv = require('dotenv');
const should = require('should');

describe("Testing mailer", function(){

    let mailer = null;
    
    before(function(){
	dotenv.config({path:path.join(__dirname, '..', '.env')});
	mailer = require('../index')({
	    api_key: 'API_KEY',
	    domain: 'DOMAIN'
	})
    })
    
    it("should send test mail", function(){
	return mailer.send({
	    to: process.env.TO,
	    subject: 'Hello',
	    text: 'Testing some Mailgun awesomeness!'
	}).then(function(body){
	    console.log(body)
	}).catch(function(err){
	    console.log(err)
	})
    })

    it("should list mails", function(){
	return mailer.list().then(function(body){
	    body.should.have.property('items')
	}).catch(function(err){
	    console.log(err)
	})
    })

    it("should read the last mail", function(){
	return new Promise(function(resolve, reject){
	    setTimeout(function(){
		mailer.list().then(function(body){
		    return mailer.read(body["items"][body["items"].length-1])
		}).then(function(body){
		    console.log(body)
		}).then(resolve).catch(reject)
	    }, 5000)
	})
    })
})

