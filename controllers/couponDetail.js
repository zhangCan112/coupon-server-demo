const couponByCode = require('../tools/dbservice').querry.couponByCode

module.exports = async (ctx, next) => {
  let tenantId = ctx.query['tenantId']
  let couponCode = ctx.query['couponCode']  
  ctx.state.data = await couponByCode(tenantId, couponCode)
}
