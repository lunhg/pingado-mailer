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

    it("should list first mail page", function(){
	return mailer.list().then(function(body){
	    body.should.have.property('items')
	}).catch(function(err){
	    console.log(err)
	})
    })

    it("should page to the next page", function(){
	return mailer.list().then(function(list){
	    return mailer.page(list, 'next')
	}).then(function(body){
	    body.should.have.property('items')
	}).catch(function(err){
	    console.log(err)
	})
	    })

    it("should page to the next page and return to previous page", function(){
	return mailer.list().then(function(list){
	    return mailer.page(list, 'next')
	}).then(function(list){
	    return mailer.page(list, 'previous')
	}).then(function(body){
	    body.should.have.property('items')
	}).catch(function(err){
	    console.log(err)
	})
	    })

    it("should page to the last page and return to first page", function(){
	return mailer.list().then(function(list){
	    return mailer.page(list, 'last')
	}).then(function(list){
	    return mailer.page(list, 'first')
	}).then(function(body){
	    body.should.have.property('items')
	}).catch(function(err){
	    console.log(err)
	})
	    })

    it("should read the first message in the last page", function(){
	return mailer.list().then(function(list){
	    return mailer.page(list, 'last')
	}).then(function(list){
	    return mailer.read(list["items"][0])
	}).then(function(body){
	    console.log(body)
	}).catch(function(err){
	    console.log(err)
	})
	    })

    it("should read the first message in the last page", function(){
	return mailer.list().then(function(list){
	    return mailer.page(list, 'last')
	}).then(function(list){
	    return mailer.read(list["items"][list["items"].length-1])
	}).then(function(body){
	    console.log(body)
	}).catch(function(err){
	    console.log(err)
	})
    })
})

