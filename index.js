var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');
global.Promise = require('bluebird');

Promise.config({
    // Enable warnings
    warnings: true,
    // Enable long stack traces
    longStackTraces: true,
    // Enable cancellation
    cancellation: true,
    // Enable monitoring
    monitoring: true
})

class Mailer {

    constructor (auth){
	let transport = mg({
	    auth:auth
	})
	this.mailer = nodemailer.createTransport(transport)
    }
    
    send(data){
	let that = this
	return new Promise(function(resolve, reject){
	    that.mailer.sendMail(data, function (err, body) {
		if(err) reject(err)
		resolve(body)
	    });
	})		 
    }
}

module.exports = function(config){
    return new Mailer(config)
}
