const couponByTerminalId = require('../tools/dbservice').querry.couponByTerminalId
module.exports = async (ctx, next) => {
   console.log('电子券服务的请求数据--',ctx.request.body)
   //{ tenantId: '126216', couponCode: '12345678901' }
   const { tenantId, terminalId } = ctx.request.body;
   // 通过租户ID和电子券码 去查数据
   let res = await couponByTerminalId(tenantId,terminalId);
   console.log(res)
   ctx.state.data = res;
}