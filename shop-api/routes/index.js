const router = require('koa-router')()
const controllers = require('../controllers')

// 测试
router.get('/api/test', controllers.test)
// 登陆
router.post('/api/login', controllers.login)
// 用户模块
router.post('/api/user/register', controllers.user.register)
router.get('/api/user/get', controllers.user.get)
router.get('/api/user/getAll', controllers.user.getAll)
// 菜单模块
router.get('/api/menus/get', controllers.menus.get)
// 角色模块
router.get('/api/roles/get', controllers.roles.get)
// 商品模块
router.get('/api/goods/get', controllers.goods.get)

module.exports = router