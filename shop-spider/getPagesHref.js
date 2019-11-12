const superagent = require('superagent')
const cheerio = require('cheerio')
const fs = require('fs')

// 读取文件
let file = fs.readFileSync(__dirname + '/data/category.json',"utf-8")
let categoryList = JSON.parse(file)
categoryList.forEach(item => {
	item.title = item.name.replace(/\s/g, "")
})
let categoryLength = categoryList.length
// 访问次数
let categoryCount = 1
let url = categoryList[categoryCount - 1].href
let count = 1
let pagesData = []
console.log("start spider")
// 开始运行
startSpider(url, getPages)

// 开始程序
function startSpider(url, method) {
	console.log("第"+count+"次尝试访问" + categoryList[categoryCount - 1].title)
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
function getPages(url, method) {
	return function(err, res) {
		if(err || !res) {
			getError(url, method, err, res)
			return
		}
		console.log("访问成功")
		count = 1
		let $ = cheerio.load(res.text)
		let firstPageHref = $(".pagination a").eq(0).attr("href")
		let lastPageHref = $(".extend").attr("href")
		let categoryMaxPage = lastPageHref.substr(lastPageHref.lastIndexOf("/") + 1)
		for(let i = 1; i <= categoryMaxPage; i++) {
			pagesData.push({
				name: categoryList[categoryCount - 1].title,
				page: i,
				href: i == 1 ? firstPageHref : firstPageHref+"/page/"+i
			})
		}
		saveToFile(categoryList[categoryCount - 1].title, pagesData)
		categoryCount++
		if(categoryCount <= categoryLength) {
			count = 1
			pagesData = []
			startSpider(categoryList[categoryCount - 1].href, getPages)
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

