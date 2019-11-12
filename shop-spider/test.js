const originUrl = "https://kbj51.com/81258.htm"
const superagent = require('superagent')
const cheerio = require('cheerio')
const fs = require('fs')
const path = require('path')
const https = require("https");
const http = require('http')
const request = require('request')

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
		// console.log($.html())
		console.log($("#post_content a").eq(0).attr("href"))
		saveImgToFile(__dirname+'/img/'+"Lolita1", $("#post_content img").eq(0).attr("src"), "Lolita1")
	}
}

function saveImgToFile(dirname, src, name) {
	if (fs.existsSync(dirname)) {
		saveImg(dirname, src, name)
		// request(src).pipe(fs.createWriteStream(dirname+"/"+name+src.substr(src.lastIndexOf("."))))
    }else {
    	fs.mkdirSync(dirname)
    	saveImg(dirname, src, name)
    	// request(src).pipe(fs.createWriteStream(dirname+"/"+name+src.substr(src.lastIndexOf("."))))
    }
}
function saveImg(dirname, src, name) {
    try {
		https.get(src, function(req,res) {
			let imgData = '';
			req.setEncoding('binary');
			req.on('data', function(chunk) {
				imgData += chunk;
			})
			req.on('end', function() {
				fs.writeFile(dirname+"/"+name+src.substr(src.lastIndexOf(".")), imgData, 'binary', function(err) {
					console.log('保存图片'+name+'成功')
				})
			})
		})
    } catch(err) {
    	console.log(err)
    }
}