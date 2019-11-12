// let categoryName = "Lolita"
// let categoryName = "koreanbj"
// let categoryName = "AsianWebcam"
// let categoryName = "AsianAmateur"

const superagent = require('superagent')
const cheerio = require('cheerio')
const fs = require('fs')
// 读取文件
let file = fs.readFileSync(__dirname + '/data/'+categoryName+'.json',"utf-8")
let pageList = JSON.parse(file)
let pageLength = pageList.length
// 访问次数
let articleCount = 1
let count = 1
let pageCount = 1
let url = pageList[pageCount - 1].href
let articlesData = []
let articlesErrorData = []
console.log("start spider")
// 开始运行
startSpider(url, getArticles)

// 开始程序
function startSpider(url, method) {
	console.log("第"+count+"次尝试访问第"+pageCount+"页")
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
	console.log("第"+count+"次访问第"+pageCount+"页失败")
	console.log(err)
	if(count == 5) {
		console.log("停止访问第"+pageCount+"页")
		articlesErrorData.push({
			index: articleCount,
			categoryName: categoryName,
			page: pageCount,
			href: url
		})
		articleCount++
		pageCount++
		count = 1
		setTimeout(function() {
			startSpider(pageList[pageCount - 1].href, getArticles)
		}, (Math.floor(Math.random()*3+1)*1000))
		return
	}
	count++
	setTimeout(function() {
		startSpider(url, method)
	}, (Math.floor(Math.random()*3+1)*1000))
}

// 获取分类数据
function getArticles(url, method) {
	return function(err, res) {
		if(err || !res) {
			getError(url, method, err, res)
			return
		}
		console.log("访问成功")
		let $ = cheerio.load(res.text)
		let articleList = $("#post_container li")
		let articleLength = articleList.length
		for(let i = 0; i < articleLength; i++) {
			articlesData.push({
				index: articleCount,
				categoryName: categoryName,
				name: articleList.eq(i).find(".article a").text(),
				page: pageCount,
				href: articleList.eq(i).find(".article a").attr("href")
			})
		}
		articleCount++
		pageCount++
		count = 1
		if(pageCount <= pageLength) {
			setTimeout(function() {
				startSpider(pageList[pageCount - 1].href, getArticles)
			}, (Math.floor(Math.random()*3+1)*1000))
		}
		if(pageCount == pageLength + 1) {
			saveToFile(categoryName+'Articles', articlesData)
			saveToFile(categoryName+'Error', articlesErrorData)
		}
	}
}

function saveToFile(name, data) {
	console.log('save ' + name + ' start')
	fs.writeFile(__dirname + '/data/' + name + '.json', JSON.stringify(data), function(err) {
		if(err) {
			console.log("save" + name + "error")
			return err
		}
		console.log('save ' + name + ' over')
	})
}