module.exports = async function(ctx, next) {
	if((ctx.cookies.get('id') && ctx.session.id && ctx.cookies.get('id') === ctx.session.id) || ctx.request.path == "/login") {
		next()
	}else {
		ctx.body = {
			code: -1,
			msg: "请先登录"
		}
	}
	// try {
	// 	await next()
	// 	ctx.body = ctx.body ? ctx.body : {
	// 		code: ctx.state.code !== undefined ? ctx.state.code : 0,
	// 		data: ctx.state.data !== undefined ? ctx.state.data : {}
	// 	}
	// } catch(e) {
	// 	ctx.status = 200
	// 	ctx.body = {
	// 		code: -1,
	// 		msg: e && e.message ? e.message : e.toString()
	// 	}
	// }
}