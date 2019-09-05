/**
 * @api {get} /api/menus/get 获取菜单信息
 * @apiName GetMenusInfo
 * @apiGroup Menus
 * @apiSuccess {Number} id 菜单id.
 * @apiSuccess {Number} parentId 上级菜单id.
 * @apiSuccess {String} menu 菜单.
 * @apiSuccess {String} alias 菜单别名.
 * @apiSuccess {String} type 菜单类型.
 * @apiSuccessExample 成功示例:
 *     {
 *       "menusInfo": [
 *       	{
 *       		"id": "3000"
 *       	 	"parentId": "0"
 *       	 	"menu": "goods"
 *       	 	"alias": "商品管理"
 *       	 	"type": "menu"
 *        	}
 *       ]
 *     }
 */
const { getMenusInfo } = require("../db/menus")
module.exports.get = async (ctx, next) => {
	const menusInfo = await getMenusInfo()
	ctx.body = {
		code: 0,
		data: {
			menusInfo: menusInfo
		}
	}
}