const couponByCode = require('../tools/dbservice').querry.couponByCode
module.exports = async (ctx, next) => {
   console.log('电子券服务的请求数据--',ctx.request.body)
   //{ tenantId: '126216', couponCode: '12345678901' }
   const { tenantId, couponCode } = ctx.request.body;
   // 通过租户ID和电子券码 去查数据
   let res = await couponByCode(tenantId, couponCode);
   let start_date = res.effectiveStartDate;
   let end_date = res.effectiveEndDate;
   let currentTime = Date.now();
   //已过期
   if(currentTime > end_date){
       ctx.state.data = {
           code:100,
           msg:'电子券已过期'
       };
       return;
   }
   //未开始
   if(currentTime < start_date){
       ctx.state.data = {
           code:100,
           msg:'电子券未开始'
       };
       return;
   }

   if(res && res.isWriteOff == 1){
       ctx.state.data = {
           code:101,
           msg:'电子券已核销过了'
       };
       return;
   }
   console.log(res)
   ctx.state.data = res;
}
