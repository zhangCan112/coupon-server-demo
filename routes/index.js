/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
    prefix: '/coupon'
})
const controllers = require('../controllers')



// --- 登录与授权 Demo --- //
// 登录接口
// router.get('/login', authorizationMiddleware, controllers.login

module.exports = router
