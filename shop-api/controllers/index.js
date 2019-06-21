/**
 * 目录映射
 * 请求接口分类
 * __dirname 指向被执行js文件的绝对路径
 * path.join 规范化路径生成
 * path.extname 返回 path 的扩展名
 * path.basename 返回 path 的最后一部分
 * fs.readdirSync 读取目录的内容，回调有两个参数 (err, files)，其中 files 是目录中的文件名的数组（同步）
 * fs.statSync 提供有关文件的信息，回调有两个参数 (err, stats)
 * fs.stats.isDirectory 是否是文件系统目录
 */
const fs = require('fs')
const path = require('path')

const mapDir = d => {
	const tree = {}
	const dirs = []
	const files = []
	fs.readdirSync(d).forEach(i => {
		if(fs.statSync(path.join(d, i)).isDirectory()) {
			dirs.push(i)
		}else {
			files.push(i)
		}
	})
	// 映射文件夹
	dirs.forEach(dir => {
		tree[dir] = mapDir(path.join(d, dir))
	})
	// 映射文件
	files.forEach(file => {
		if(path.extname(file) === '.js') {
			tree[path.basename(file, '.js')] = require(path.join(d, file))
		}
	})
	return tree
}

module.exports = mapDir(path.join(__dirname))

