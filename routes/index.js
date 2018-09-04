/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
    prefix: '/coupon'
})
const controllers = require('../controllers')

const paramCheckMaker = require('@xsy-customize/common-middlewares/paramChecker')
const query = paramCheckMaker.query
const post = paramCheckMaker.post



// --- 登录与授权 Demo --- //
//新建一批优惠劵
router.get('/loadBullet', controllers.loadBullet)

///查询待领取的优惠券列表
router.get('/claimCoupons', query('tenantId'), controllers.claimCoupons)
///领取优惠券
router.get('/receivedCoupon', query('tenantId', 'couponType', 'customerId'), controllers.receivedCoupon)
///查看卡券包列表
router.get('/couponBag', query('tenantId', 'couponStatus', 'customerId'), controllers.couponBag)
///卡劵详情
router.get('/coupon', query('tenantId', 'couponCode'), controllers.couponDetail)

module.exports = router
