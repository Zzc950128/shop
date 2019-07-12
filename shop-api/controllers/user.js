/**
 * @api {get} /api/user/get 获取用户信息
 * @apiName GetUserInfo
 * @apiGroup User
 * @apiParam {Number} id 用户ID.
 * @apiSuccess {String} name 用户姓名.
 * @apiSuccess {String} roles 用户角色.
 * @apiSuccess {String} rolesAlias 用户角色别名.
 * @apiSuccessExample 成功示例:
 *     {
 *       	name: "zzc",
 *       	roles: "1",
 *       	rolesAlias: "superAdmin",
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
 *       	name: "zzc",
 *       	roles: "1",
 *       	rolesAlias: "superAdmin",
 *     }
 */
const { getUserInfo, getAllUserInfo } = require("../db/user")
module.exports.get = async (ctx, next) => {
	let id = ctx.query.id
	if(!id) {
		let user = ctx.session.user
		user.forEach(item => {
			if(item.sessionId == ctx.cookies.get('SESSIONID')) {
				id = item.id
			}
		})
	}
	if(!id) {
		ctx.body = {
			code: -2,
			data: {
				data: "缺少用户id"
			}
		}
		return
	}
	let userInfo = await getUserInfo(id)
	if(userInfo.length == 0) {
		ctx.body = {
			code: -3,
			data: {
				msg: "用户不存在!"
			}
		}
	}else {
		ctx.body = {
			code: 1,
			data: {
				data: userInfo
			}
		}
	}
}
module.exports.getAll = async (ctx, next) => {
	let userInfo = await getAllUserInfo()
	ctx.body = {
		code: 1,
		data: {
			data: userInfo
		}
	}
}
