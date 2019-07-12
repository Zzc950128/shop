/**
 * @api {get} /api/goods/get 获取商品信息
 * @apiName GetGoodsInfo
 * @apiGroup Goods
 * @apiParam {Number} pageSize 每页展示数.
 * @apiParam {Number} page 页数.
 * @apiSuccess {String} data 商品信息.
 * @apiSuccessExample 成功示例:
 *     {
 *       "data": "商品信息"
 *     }
 */
const { getGoodsInfo } = require("../db/goods")
module.exports.get = async (ctx, next) => {
	const goodsInfo = await getGoodsInfo()
	ctx.body = {
		code: 1,
		data: {
			data: goodsInfo
		}
	}
}