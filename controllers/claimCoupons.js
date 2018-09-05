const knex = require('../mysql')
const claimCoupons = require('../tools/dbservice').querry.claimCoupons

module.exports = async (ctx, next) => {
  let tenantId = ctx.query['tenantId']
  let customerId = ctx.query['customerId']
  ctx.state.data = await claimCoupons(tenantId, customerId)
}
