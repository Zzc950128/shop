const originUrl = "https://kbj51.com/81258.htm"
const superagent = require('superagent')
const cheerio = require('cheerio')
const fs = require('fs')

// 访问次数
let count = 1
console.log("start spider")
// 开始运行
startSpider(originUrl, getCategory)

// 开始程序
function startSpider(url, method) {
	console.log("第"+count+"次尝试访问")
	superagent
		.get(url)
		// .proxy(proxy)
		.timeout({
			response: 10000,
			deadline: 20000
		})
		.end(method(url, method))
}

// 失败重新访问
function getError(url, method, err, res) {
	console.log("第"+count+"次访问失败")
	console.log(err)
	if(count == 5) {
		console.log("停止访问")
		return
	}
	count++
	startSpider(url, method)
}

// 获取分类数据
function getCategory(url, method) {
	return function(err, res) {
		if(err || !res) {
			getError(url, method, err, res)
			return
		}
		console.log("访问成功")
		count = 1
		let $ = cheerio.load(res.text)
		console.log($.html())
	}
}
