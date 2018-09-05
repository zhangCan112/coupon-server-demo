// 登录授权接口
const addBatchedCoupon = require('../tools/dbservice').opt.addBatchedCoupon
const axios = require('axios')
module.exports = async (ctx, next) => {
  await addBatchedCoupon(126216, 1, 10);
  await addBatchedCoupon(126216, 2, 10);
  await addBatchedCoupon(126216, 3, 10);
  await addBatchedCoupon(126216, 4, 10);
  await addBatchedCoupon(126216, 5, 10);
  await addBatchedCoupon(126216, 6, 10);
  // ctx.state.data = await axios({
  //   baseURL: 'http://localhost:5151/coupon',
  //   method: 'GET',
  //   url: '/coupon',
  //   params: {
  //     tenantId: '126216',
  //     couponCode: '273eb2dfa96'
  //   }
  // }).then((res)=>res.data.data)
}
