module.exports = async function(ctx, next) {
	try {
		await next()
		ctx.body = ctx.body ? ctx.body : {
			code: ctx.state.code !== undefined ? ctx.state.code : 0,
			data: ctx.data !== undefined ? ctx.data : {}
		}
	} catch(e) {
		ctx.status = 200
		ctx.body = {
			code: -1,
			msg: e && e.message ? e.message : e.toString()
		}
	}
}