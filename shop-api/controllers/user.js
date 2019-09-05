/**
 * @api {get} /api/user/get 获取用户信息
 * @apiName GetUserInfo
 * @apiGroup User
 * @apiParam {Number} id 用户ID.
 * @apiParam {String} username 用户姓名.
 * @apiSuccess {String} name 用户姓名.
 * @apiSuccess {String} roles 用户角色.
 * @apiSuccess {String} rolesAlias 用户角色别名.
 * @apiSuccessExample 成功示例:
 *     {
 *     		userInfo: [
 *     			{
 *     				name: "zzc"
 *     				roles: "1"
 *     				rolesAlias: "superAdmin"
 *     			}
 *     		]
 *     }
 */
/**
 * @api {get} /api/user/getAll 获取所有用户信息
 * @apiName GetAllUserInfo
 * @apiGroup User
 * @apiSuccess {String} name 用户姓名.
 * @apiSuccess {String} roles 用户角色.
 * @apiSuccess {String} rolesAlias 用户角色别名.
 * @apiSuccessExample 成功示例:
 *     {
 *     		"userInfo": [
 *     			{
 *     				name: "zzc"
 *     				roles: "1"
 *     				rolesAlias: "superAdmin"
 *     			}
 *     		]
 *     }
 */
/**
 * @api {post} /api/user/register 用户注册
 * @apiName registerUser
 * @apiGroup User
 * @apiParam {String} username 用户名.
 * @apiParam {String} password 密码.
 * @apiParam {String} rpsd 密码确认.
 * @apiSuccessExample 成功示例:
 *     {
 *     		code: 0,
 *     		msg: "注册成功"
 *     }
 */
const { aseEncode } = require("../utils/tools.js")
const { getUserInfo, getAllUserInfo, registerUser } = require("../db/user")
module.exports.get = async (ctx, next) => {
	let id = ctx.query.id
	let username = ctx.query.username
	let query = {}
	if(!id && !username) {
		id = ctx.session.id
	}
	if(!id && !username) {
		ctx.body = {
			code: -2,
			msg: "缺少查询信息"
		}
		return
	}
	if(id) {
		query.id = id
	}
	if(username) {
		query.username = username
	}
	let userInfo = await getUserInfo(query)
	if(userInfo.length == 0) {
		ctx.body = {
			code: -3,
			msg: "用户不存在!"
		}
	}else {
		ctx.body = {
			code: 0,
			data: {
				userInfo: userInfo
			}
		}
	}
}
module.exports.getAll = async (ctx, next) => {
	let userInfo = await getAllUserInfo()
	ctx.body = {
		code: 0,
		data: {
			userInfo: userInfo
		}
	}
}
module.exports.register = async (ctx, next) => {
	let data = ctx.request.body
	if(!data.username || data.username == "") {
		ctx.body = {
			code: -2,
			msg: "请输入用户名"
		}
		return
	}
	if(!data.password || data.password == "" || !data.rpsd || data.rpsd == "") {
		ctx.body = {
			code: -2,
			msg: "请输入密码"
		}
		return
	}
	let userInfo = await getUserInfo({username: data.username})
	// console.log(userInfo)
	if(userInfo.length > 0) {
		ctx.body = {
			code: -3,
			msg: "用户名已被占用"
		}
		return
	}
	if(data.password != data.rpsd) {
		ctx.body = {
			code: -3,
			msg: "两次输入的密码不一致"
		}
		return
	}
	let count = await getAllUserInfo("true")
	// console.log(count)
	let id = count + 1
	let insertData = {
		id: id,
		username: data.username,
		password: data.password,
		rolesAlias: "general",
	}
	await registerUser(insertData).then(res => {
		// console.log(res)
		let token = aseEncode((insertData.username + "," + insertData.id + "," + (+new Date())), "shop-token")
		ctx.session.id = insertData.id
		ctx.session.user = insertData
		ctx.session.token = token
		ctx.cookies.set('token', token);
		// ctx.cookies.set('token', token, { httpOnly: true });
		ctx.body = {
			code: 0,
			msg: "注册成功"
		}
	}).catch(err => {
		ctx.body = {
			code: -3,
			msg: "注册失败: " + err
		}
	})
}

