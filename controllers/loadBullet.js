// 登录授权接口
const addBatchedCoupon = require('../tools/dbservice').opt.addBatchedCoupon
module.exports = async (ctx, next) => {
  await addBatchedCoupon(126216, 1, 10);
  await addBatchedCoupon(126216, 2, 10);
  await addBatchedCoupon(126216, 3, 10);
  await addBatchedCoupon(126216, 4, 10);
  await addBatchedCoupon(126216, 5, 10);
  await addBatchedCoupon(126216, 6, 10);
}
