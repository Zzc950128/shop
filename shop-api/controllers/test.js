// 接口文档示例

/**
 * @api {get} /api/user/:id 获取用户信息
 * @apiName GetUser
 * @apiGroup User
 * @apiParam {Number} id 用户ID.
 * @apiSuccess {String} name 用户姓名.
 * @apiSuccessExample 成功示例:
 *     {
 *       "name": "John"
 *     }
 */

/**
 * @api {get} /test 获取测试信息
 * @apiName GetTest
 * @apiGroup Test
 * @apiParam {Number} id 测试ID.
 * @apiSuccess {String} result 测试结果.
 * @apiSuccessExample 成功示例:
 *     {
 *       "result": "测试成功"
 *     }
 */

module.exports = async (ctx, next) => {
	ctx.body = {
		code: 0,
		data: {
			result: "测试成功"
		}
	}
}