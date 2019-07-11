// 接口文档示例

/**
 * @api {get} /api/user/:id 获取用户信息
 * @apiName GetUserInfo
 * @apiGroup User
 * @apiParam {Number} id 用户ID.
 * @apiSuccess {String} name 用户姓名.
 * @apiSuccessExample 成功示例:
 *     {
 *       "name": "Zzc"
 *     }
 */

/**
 * @api {get} /api/test 测试接口
 * @apiName Test
 * @apiGroup Test
 * @apiSuccess {String} data 返回測試數據.
 * @apiSuccessExample 成功示例:
 *     {
 *       "data": "测试成功"
 *     }
 */

module.exports = async (ctx, next) => {
	ctx.body = {
		code: 0,
		data: {
			data: "测试成功"
		}
	}
}