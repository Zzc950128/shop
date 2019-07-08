const router = require('koa-router')()
const controllers = require('../controllers')
router.get('/', controllers.default)
router.get('/test', controllers.test)
router.get('/login', controllers.login)
module.exports = router