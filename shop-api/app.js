const koa = require('koa')
const config = require('./config')
const { accessLogger, systemLogger } = require('./logger')
const response = require('./middlewares/response')
const session = require('koa-session')
const bodyParser = require('koa-bodyparser')
const router = require('./routes')
const compress = require('koa-compress');
// const mongodb = require('mongodb')

const app = new koa()
app.keys = ['secret'];
app.use(accessLogger()); //中间件
app.use(bodyParser())
app.use(session(config.sessionConfig, app))
app.use(response);
app.use(router.routes())
app.use(router.allowedMethods());
app.use(compress(config.compressConfig));
app.listen(config.port, () => {console.log(`listening on port ${config.port}`)})
