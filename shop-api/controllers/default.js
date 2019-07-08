module.exports = async (ctx, next) => {
	ctx.body = {
		code: 0,
		data: {
			result: "首页"
		}
	}
}