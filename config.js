const CONF = {
    port: '5151',
    rootPathname: '',

    /**
     * MySQL 配置，用来存储 session 和用户信息
     * 若使用了腾讯云微信小程序解决方案
     * 开发环境下，MySQL 的初始密码为您的微信小程序 appid
     */
     mysql: {
       host: '127.0.0.1',
       port: 3306,
       user: 'root',
       db: 'xcx-coupon',
       pass: 'Zcdxl@1988',
       char: 'utf8mb4'
     }
}

module.exports = CONF
