const Koa = require('koa')
const app = new Koa()
const debug = require('debug')('coupon-server-demo')
const bodyParser = require('koa-bodyparser')
const response = require('@xsy-customize/common-middlewares/response')
const config = require('./config')
const logger = require('@xsy-customize/logger')
// const logger = require('./utils/logger')

// logger.info('server starting up...')
logger.mark("===============服务启动中...===============")
logger.mark(config)
// 使用响应处理中间件
app.use(response)
// 解析请求体
app.use(bodyParser())
// 引入路由分发
const router = require('./routes')
app.use(router.routes())
// 启动程序，监听端口
app.listen(config.port, () => debug(`listening on port ${config.port}`))
// logger.info('启动程序，监听端口')
logger.mark("===============服务启动成功，监听端口...===============")
