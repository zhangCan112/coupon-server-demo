/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
    prefix: '/coupon'
})
//会员
const controllers = require('../controllers')

const paramCheckMaker = require('@xsy-customize/common-middlewares/paramChecker')
const query = paramCheckMaker.query
const post = paramCheckMaker.post



// --- 登录与授权 Demo --- //
//新建一批优惠劵
router.get('/loadBullet', controllers.loadBullet)

///查询待领取的优惠券列表
router.get('/claimCoupons', query('tenantId', 'customerId'), controllers.claimCoupons)
///领取优惠券
router.get('/receivedCoupon', query('tenantId', 'couponType', 'customerId'), controllers.receivedCoupon)
///查看卡券包列表
router.get('/couponBag', query('tenantId', 'couponStatus', 'customerId'), controllers.couponBag)
///卡劵详情
router.get('/coupon', query('tenantId', 'couponCode'), controllers.couponDetail)


///检验核销券码是否有效
router.post('/checkNumber', post('tenantId', 'couponCode'), controllers.checkNumber)

///核销电子券
router.post('/submitNumber', post('jId', 'currentUserId'), controllers.submitNumber)

///查询我的核销列表
router.post('/myVerification', post('tenantId', 'contactId'), controllers.myVerification)

///查询店员核销列表
router.post('/allVerification', post('tenantId', 'terminalId'), controllers.allVerification)

module.exports = router
