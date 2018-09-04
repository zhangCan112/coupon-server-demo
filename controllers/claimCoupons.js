const knex = require('../mysql')
const claimCoupons = require('../tools/dbservice').querry.claimCoupons

module.exports = async (ctx, next) => {
  let tenantId = ctx.query['tenantId']
  ctx.state.data = await claimCoupons(tenantId)
}
