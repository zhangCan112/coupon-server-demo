const couponById = require('../tools/dbservice').querry.couponById
const updateCouponById = require('../tools/dbservice').opt.updateCouponById
module.exports = async (ctx, next) => {
    //'jId', 'currentUserId'
    const {
        jId,
        currentUserId,
        tenantId,
        terminalId
    } = ctx.request.body;
    let currentTime = Date.now();
    console.log('核销电子券')
    // 根据数据更新电子券
    let updateData = {
        write_of_date: currentTime,
        write_of_contact:currentUserId,
        is_write_off:1,
        terminal_id:terminalId
    }
    let res = await couponById(tenantId, jId);
    let start_date = res.effectiveStartDate;
    let end_date = res.effectiveEndDate;
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

    let resUpdate = updateCouponById(tenantId, jId, updateData);
    console.log(resUpdate)
    ctx.state.data = {
        code:103,
        msg:'电子券核销成功了'
    };;
}
