/**
 * @api {post} /api/login 用户登录
 * @apiName Login
 * @apiGroup Sys
 * @apiParam {String} username 用户名.
 * @apiParam {String} password 密码.
 * @apiSuccess {String} data 成功提示.
 * @apiSuccessExample 成功示例:
 *     {
 *       "data": "登陆成功"
 *     }
 */
const { getAllUserInfo } = require("../db/user")
module.exports = async (ctx, next) => {
	let query = ctx.request.query
	if(!query.username) {
		ctx.body = {
			code: -2,
			data: {
				msg: "请输入用户名!"
			}
		}
		return
	}
	if(!query.password) {
		ctx.body = {
			code: -2,
			data: {
				msg: "请输入密码!"
			}
		}
		return
	}
	const userInfo = await getAllUserInfo()
	let flag = false
	let curUserInfo = {}
	userInfo.forEach(item => {
		if(query.username == item.name && query.password == item.password) {
			flag = true
			curUserInfo = item
		}
	})
	if(flag) {
		let id = curUserInfo.name + (+new Date())
		if(!ctx.session.user) {
			ctx.session.user = []
		}
		ctx.session.user.push({
			sessionId: id,
			id: curUserInfo.id,
			name: curUserInfo.username,
		})
		ctx.cookies.set('SESSIONID', id, { httpOnly: false });
		ctx.body = {
			code: 0,
			data: {
				data: "登陆成功"
			}
		}
	}else {
		ctx.body = {
			code: -3,
			data: {
				msg: "账号名或密码不正确!"
			}
		}
	}
}