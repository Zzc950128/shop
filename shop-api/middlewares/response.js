const { hasPermission } = require("../utils/tools.js")
module.exports = async function(ctx, next) {
	let whitePage = ["/api/login", "/api/test", "/api/user/register"]
	let flag = false
	if(ctx.session.token == ctx.cookies.get('token')) {
		flag = true
	}
	if(flag || whitePage.indexOf(ctx.path) > -1) {
		let flag = await hasPermission(ctx)
		if(flag) {
			await next()
		}else {
			ctx.body = {
				code: -4,
				msg: "无权限"
			}
		}
	}else {
		ctx.body = {
			code: -1,
			msg: "请先登录"
		}
	}
}