
const shortid = require('shortid')

const templateMaker =  (tenant_id, coupon_type, coupon_type_name, name, face_value, description, effective_start_date, effective_end_date) => {
  //coupon_code规则： MD16（租户id+counpon_type+当前时间戳+shortid）
  let sid = shortid.generate()
  let coupon_code =  tenant_id + coupon_type + Date.now().toString(10) +  sid + ''
  coupon_code = coupon_code.substring(coupon_code.length - 11, coupon_code.length)
  return {
    tenant_id,
    coupon_code,
    coupon_type,
    coupon_type_name,
    name,
    face_value,
    description,
    effective_start_date,
    effective_end_date
  }
}


const template01 = (tenant_id) => {
  let start = (new Date("2018-09-3 00:00:00")).getTime()
  let end = (new Date("2018-10-03 00:00:00")).getTime()
  return templateMaker(tenant_id, 1, '购物券', '新用户购物劵', 50, '无门槛立减，不可叠加使用', start, end)
}

const template02 = (tenant_id) => {
  let start = (new Date("2018-09-3 00:00:00")).getTime()
  let end = (new Date("2018-10-03 00:00:00")).getTime()
  return templateMaker(tenant_id, 2, '包邮券', '购物包邮劵', 20, '仅限国内,只能抵扣邮费', start, end)
}

const template03 = (tenant_id) => {
  let start = (new Date("2018-09-3 00:00:00")).getTime()
  let end = (new Date("2018-10-03 00:00:00")).getTime()
  return templateMaker(tenant_id, 3, '满减券', '购物满减劵', 100, '满199减100', start, end)
}

const template04 = (tenant_id) => {
  let start = (new Date("2018-09-3 00:00:00")).getTime()
  let end = (new Date("2018-10-03 00:00:00")).getTime()
  return templateMaker(tenant_id, 4, '优惠券', '店铺优惠券', 30, '全店通用，买家购买全店商品凭劵抵扣现金', start, end)
}

const template05 = (tenant_id) => {
  let start = (new Date("2018-09-3 00:00:00")).getTime()
  let end = (new Date("2018-10-03 00:00:00")).getTime()
  return templateMaker(tenant_id, 5, '优惠券', '家电优惠券', 200, '买家购买家电类产品，凭劵抵扣现金', start, end)
}

const template06 = (tenant_id) => {
  let start = (new Date("2018-09-3 00:00:00")).getTime()
  let end = (new Date("2018-10-03 00:00:00")).getTime()
  return templateMaker(tenant_id, 6, '优惠券', '店庆优惠劵', 99, '仅限店庆当日使用，凭劵抵扣现金', start, end)
}


module.exports = (tenant_id, coupon_type, amount) =>{
  let templates = [template01,template02,template03,template04,template05,template06]
  if (coupon_type < 0 || coupon_type > templates.length) {
    throw new Error('电子劵类型不存在！')
  }
  let template = templates[coupon_type - 1]

  let bullets = []

  for(let i = 0; i < amount; i++) {
    bullets.push(template(tenant_id))
  }

  return bullets
}
