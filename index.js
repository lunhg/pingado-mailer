const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');
const request = require('request')
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
	    auth:{
		api_key: process.env[auth.api_key],
		domain: process.env[auth.domain]
	    }
	})
	this.api_key = auth.api_key;
	this.domain = auth.domain;
	this.mailer = nodemailer.createTransport(transport)
    }
    
    send(data){
	let that = this
	return new Promise(function(resolve, reject){
	    data.from = 'Postmaster <postmaster\@'+process.env[that.domain]+'>'
	    that.mailer.sendMail(data, function (err, body) {
		if(err) reject(err)
		resolve(body)
	    });
	})		 
    }

    list(){
	let that = this
	return new Promise(function(resolve, reject){
	    request({
		method:'GET',
		uri: `https:\/\/api:${process.env[that.api_key]}\@api.mailgun.net\/v3\/${process.env[that.domain]}/events`
	    }, function(err, res){
		if(err) reject(err)
		let obj = JSON.parse(res.body)
		resolve(obj)
	    })
	})
    }

    read(item){
	let that = this
	return new Promise(function(resolve, reject){
	    let url = item.storage.url.replace(/s[a-z]\.api\.mailgun\.net/, `api:${process.env[that.api_key]}\@se.api.mailgun.net`)
	    console.log(url)
	    request({
		method:'GET',
		uri: url
	    }, function(err, res){
		if(err) reject(err)
		resolve(JSON.parse(res.body))
	    })
	})
    }
}

module.exports = function(config){
    return new Mailer(config)
}
