const superagent = require('superagent')
const cheerio = require('cheerio')
const fs = require('fs')

console.log("start")
superagent
	.get("www.kbj51.com")
	.timeout({
		response: 5000,
		deadline: 600000
	})
	.end(function(error, response) {
		if(error) {
			console.log("ERROR: " + error)
			return
		}
		let $ = cheerio.load(response.text)
		console.log($.html())
	})