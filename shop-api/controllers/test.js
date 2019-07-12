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