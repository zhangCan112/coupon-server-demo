const couponsByReceivedCustomer = require('../tools/dbservice').querry.couponsByReceivedCustomer

module.exports = async (ctx, next) => {
  let tenantId = ctx.query['tenantId']
  let customerId = ctx.query['customerId']
  let couponStatus = ctx.query['couponStatus']
  ctx.state.data = await couponsByReceivedCustomer(tenantId, customerId, couponStatus)
}
