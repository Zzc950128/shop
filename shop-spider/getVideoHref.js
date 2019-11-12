let articleName = "LolitaArticles"
let filename = "Lolita"
// let articleName = "koreanbjArticles"
// let filename = "koreanbj"
// let articleName = "AsianWebcamArticles"
// let filename = "AsianWebcam"
// let articleName = "AsianAmateurArticles"
// let filename = "AsianAmateur"

const superagent = require('superagent')
const cheerio = require('cheerio')
const fs = require('fs')
const path = require('path')
const request = require('request')
const https = require("https")

// 读取文件
let file = fs.readFileSync(__dirname + '/data/'+articleName+'.json',"utf-8")
let articleList = JSON.parse(file)
let articleLength = articleList.length
// 访问次数
let count = 1
let articleCount = 1
let url = articleList[articleCount - 1].href
let videosData = []
let videosErrorData = []
let imgError = []

console.log("共"+articleLength+"页")
console.log("start spider")
// 开始运行
startSpider(url, getVideos)

// 开始程序
function startSpider(url, method) {
	console.log("第"+count+"次尝试访问第"+articleCount+"页")
	superagent
		.get(url)
		// .proxy(proxy)
		.timeout({
			response: 10000,
			deadline: 30000
		})
		.end(method(url, method))
}

// 失败重新访问
function getError(url, method, err, res) {
	console.log("第"+count+"次访问第"+articleCount+"页失败")
	console.log(err)
	if(count == 5) {
		console.log("停止访问第"+articleCount+"页")
		videosErrorData.push({
			index: articleCount,
			page: articleList[articleCount - 1].page,
			articleName: articleName,
			href: url,
		})
		articleCount++
		count = 1
		setTimeout(function() {
			startSpider(articleList[articleCount - 1].href, getVideos)
		}, (Math.floor(Math.random()*3+1)*1000))
		return
	}
	count++
	setTimeout(function() {
		startSpider(url, method)
	}, (Math.floor(Math.random()*3+1)*1000))
}

// 获取分类数据
function getVideos(url, method) {
	return function(err, res) {
		if(err || !res) {
			getError(url, method, err, res)
			return
		}
		console.log("访问成功")
		let $ = cheerio.load(res.text)
		videosData.push({
			index: articleCount,
			page: articleList[articleCount - 1].page,
			articleName: articleName,
			name: articleList[articleCount - 1].name,
			href: $("#post_content a").eq(0).attr("href"),
			img: $("#post_content img").eq(0).attr("src"),
		})
		// saveImgToFile(__dirname+'/img/'+filename+articleList[articleCount - 1].page, $("#post_content img").eq(0).attr("src"), filename+articleCount)
		articleCount++
		count = 1
		if(articleCount <= articleLength) {
			setTimeout(function() {
				startSpider(articleList[articleCount - 1].href, getVideos)
			}, (Math.floor(Math.random()*3+1)*1000))
		}
		if(articleCount == articleLength + 1) {
			saveToFile(filename+'Videos', videosData)
			saveToFile(filename+'Error', videosErrorData)
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
		if(articleCount == articleLength) {
			saveToFile(filename+'Img', imgError)
		}
    } catch(err) {
    	console.log('保存图片'+name+'失败')
    	imgError.push(name)
    	if(articleCount == articleLength) {
			saveToFile(filename+'Img', imgError)
		}
    }
}