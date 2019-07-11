module.exports = async (ctx, next) => {
	let query = ctx.request.query
	if(!query.id) {
		ctx.body = {
			code: -1,
			data: {
				msg: "请输入用户名!"
			}
		}
		return
	}
	if(!query.psd) {
		ctx.body = {
			code: -1,
			data: {
				msg: "请输入密码!"
			}
		}
		return
	}
	if(query.id == "123456" && query.psd == "123456") {
		ctx.session.id = "123456"
		ctx.session.username = "zzc"
		ctx.cookies.set('id', ctx.session.id, { httpOnly: false });
		ctx.body = {
			code: 0,
			data: {
				data: "登陆成功 " + ctx.session.username
			}
		}
	}else {
		ctx.body = {
			code: -1,
			data: {
				msg: "密码不正确!"
			}
		}
	}
}