const mysql = require('../mysql')
const couponMaker = require('./counpon-Maker')

const DBERR = {
  ERR_WHEN_INSERT_TO_DB: 'ERR_WHEN_INSERT_TO_DB',
  ERR_WHEN_UPDATE_TO_DB: 'ERR_WHEN_UPDATE_TO_DB',
  ERR_WHEN_GET_FROM_DB: 'ERR_WHEN_GET_FROM_DB'
}

/**
 * 通过领取人查询已领取的优惠劵
 * @param {string} tenant_id
 * @param {string} received_customer
 * @param {string} couponStatus 0:未使用 1:已使用 2:已过期
 * @return {Array}
 */
const couponsByReceivedCustomer = async (tenant_id, received_customer, couponStatus) => {
  let sql = mysql('coupon-pool').select('*').where({tenant_id, received_customer})
  switch (couponStatus) {
    case '0':
      return sql.andWhere({is_write_off: 0})
      break;
    case '1':
      return sql.andWhere({is_write_off: 1})
      break;
    case '2':
      let dateTime = new Date().getTime()
      return sql.andWhere('effective_end_date', '<', dateTime)
      break;
    default:
      break;

  }
  return []
}

/**
 * 通查询某个优惠券的全部信息
 * @param {string} tenant_id
 * @param {string} coupon_code
 * @return {Object}
 */
const couponByCode = async (tenant_id, coupon_code) => {
  return mysql('coupon-pool').select('*').where({tenant_id, coupon_code}).then((dataArray) => {
    let data = dataArray[0]
    if (data) {
      return data
    }
    return {}
  })
}

/**
 * 可领取的优惠卷列表
 * @param {string} tenant_id
 * @return {Array}
 */
const claimCoupons = async (tenant_id) => {
  return mysql('coupon-pool').distinct('tenant_id', 'coupon_type', 'coupon_type_name', 'name', 'face_value', 'description', 'effective_start_date', 'effective_end_date').where({is_received: 0, tenant_id}).select().catch(e => {
    throw new Error(`${DBERR.ERR_WHEN_GET_FROM_DB}\n${e}`)
  })
}

let querry = {
  couponsByReceivedCustomer,
  couponByCode,
  claimCoupons
}

/**
 * 批量向优惠劵池添加优惠劵
 * @param {string} tenant_id    租户id
 * @param {string} coupon_type 卡劵类型
 * @param {string} amount  生成数量
 */
const addBatchedCoupon = async (tenant_id, coupon_type, amount) => {
  let coupons = couponMaker(tenant_id, coupon_type, amount)

  for (let i = 0; i < coupons.length; i++) {
    let coupon = coupons[i];
    await mysql('coupon-pool').count('coupon_code as isExit').where({coupon_code: coupon.coupon_code}).then(res => {
      if (!res[0].isExit) {
        return mysql('coupon-pool').insert(coupon)
      }
    }).catch(e => {
      throw new Error(`${DBERR.ERR_WHEN_INSERT_TO_DB}\n${e}`)
    })
  }
}

/**
 * 领取优惠券
 * @param {string} tenant_id    租户id
 * @param {string} coupon_type 卡劵类型
 * @param {string} received_customer  领取人
 */
const receivedCouponByType = (tenant_id, coupon_type, received_customer) => {
  let is_received = 0;
  return mysql('coupon-pool').count('coupon_code as isExit').where({tenant_id, coupon_type, received_customer}).then(res => {
    if (!res[0].isExit) {
      return mysql('coupon-pool').select('*').where({tenant_id, coupon_type, is_received}).then(res => {
        if (res.length > 0) {
          let first = res[0];
          let receive_date = new Date().getTime()
          return mysql('coupon-pool').where({id: first.id}).update({is_received: 1, receive_date: receive_date, received_customer: received_customer}).then(() => {
            return {coupon_code: first.coupon_code}
          })
        } else {
          let error = new Error(`优惠券已经被领光了！`)
          error.code = -1;
          throw error
        }
      })
    } else {
      let error = new Error(`优惠券领过了，不能重复领取！`)
      error.code = -1;
      throw error
    }
  }).catch(e => {
    if (e.code) {
      throw e
    } else {
        throw new Error(`${DBERR.ERR_WHEN_INSERT_TO_DB}\n${e}`)
    }

  })
}

let opt = {
  addBatchedCoupon,
  receivedCouponByType
}

module.exports = {
  opt,
  querry
}
