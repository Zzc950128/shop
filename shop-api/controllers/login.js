/**
 * @api {post} /api/login 用户登录
 * @apiName Login
 * @apiGroup Sys
 * @apiParam {String} username 用户名.
 * @apiParam {String} password 密码.
 * @apiSuccess {String} data 成功提示.
 * @apiSuccessExample 成功示例:
 *     {
 *       "msg": "登陆成功"
 *     }
 */
const { aseEncode } = require("../utils/tools.js")
const { getAllUserInfo } = require("../db/user")
module.exports = async (ctx, next) => {
	let query = ctx.request.body
	if(!query.username) {
		ctx.body = {
			code: -2,
			msg: "请输入用户名!"
		}
		return
	}
	if(!query.password) {
		ctx.body = {
			code: -2,
			msg: "请输入密码!"
		}
		return
	}
	const userInfo = await getAllUserInfo()
	let flag = false
	let curUserInfo = {}
	userInfo.forEach(item => {
		if(query.username == item.username && query.password == item.password) {
			flag = true
			curUserInfo = item
		}
	})
	if(flag) {
		let token = aseEncode((curUserInfo.username + "," + curUserInfo.id + "," + (+new Date())), "shop-token")
		ctx.session.id = curUserInfo.id
		ctx.session.user = curUserInfo
		ctx.session.token = token
		ctx.cookies.set('token', token, { httpOnly: true });
		ctx.body = {
			code: 0,
			msg: "登陆成功"
		}
	}else {
		ctx.body = {
			code: -3,
			msg: "账号名或密码不正确!"
		}
	}
}