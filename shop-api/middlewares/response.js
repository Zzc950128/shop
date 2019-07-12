module.exports = async function(ctx, next) {
	let user = ctx.session.user
	let flag = false
	if(user) {
		user.forEach(item => {
			if(item.sessionId == ctx.cookies.get('SESSIONID')) {
				flag = true
			}
		})
	}
	if(flag || ctx.path == "/api/login" || ctx.path == "/api/test") {
		await next()
	}else {
		ctx.body = {
			code: -1,
			msg: "请先登录"
		}
	}
}