const receivedCouponByType = require('../tools/dbservice').opt.receivedCouponByType

module.exports = async (ctx, next) => {
  let tenantId = ctx.query['tenantId']
  let couponType = ctx.query['couponType']
  let customerId = ctx.query['customerId']
  ctx.state.data = await receivedCouponByType(tenantId, couponType, customerId)
}
