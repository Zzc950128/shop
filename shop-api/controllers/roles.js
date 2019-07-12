/**
 * @api {get} /api/roles/get 获取角色信息
 * @apiName GetRolesInfo
 * @apiGroup Sys
 * @apiSuccess {String} id 角色id.
 * @apiSuccess {String} role 角色.
 * @apiSuccess {String} alias 角色别名.
 * @apiSuccessExample 成功示例:
 *     {
 *       [
 *       	{
 *       		id: "1",
 *       		role: "superAdmin",
 *       		alias: "超级管理员",
 *       	}
 *       ]
 *     }
 */
const { getRolesInfo } = require("../db/roles")
module.exports.get = async (ctx, next) => {
	let rolesInfo = await getRolesInfo()
	ctx.body = {
		code: 1,
		data: {
			data: rolesInfo
		}
	}
}