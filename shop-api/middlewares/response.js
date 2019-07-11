module.exports = async function(ctx, next) {
	if((ctx.cookies.get('id') && ctx.session.id && ctx.cookies.get('id') === ctx.session.id) || ctx.request.path == "/login") {
		next()
	}else {
		ctx.body = {
			code: -1,
			msg: "请先登录"
		}
	}
}