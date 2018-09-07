const couponByWriteOfContact = require('../tools/dbservice').querry.couponByWriteOfContact
module.exports = async (ctx, next) => {
   console.log('电子券服务的请求数据--',ctx.request.body)
   //{ tenantId: '126216', couponCode: '12345678901' }
   const { tenantId, contactId } = ctx.request.body;
   // 通过租户ID和电子券码 去查数据
   let res = await couponByWriteOfContact(tenantId,contactId);
   console.log("====>couponByWriteOfContact")
   console.log(res)
   ctx.state.data = res;
}
