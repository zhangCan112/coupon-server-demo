/**
 * 腾讯云微信小程序解决方案
 * Demo 数据库初始化脚本
 * @author Jason
 */
const fs = require('fs')
const path = require('path')
const logger = require('@xsy-customize/logger')

const {
  mysql: config
} = require('../config')

logger.mark('\n=========开始初始化数据库...===========')

const DB = require('knex')({
  client: 'mysql',
  connection: {
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.pass,
    database: config.db,
    charset: config.char,
    multipleStatements: true
  }
})

const createInitdbPromise = (initDbFilePath) => {
    logger.mark('准备读取 SQL 文件:' + initDbFilePath)
    // 读取 .sql 文件内容
    const content = fs.readFileSync(initDbFilePath, 'utf8')
    // 执行 .sql 文件内容
    logger.mark('开始执行 SQL 文件' + initDbFilePath + '...')
    return DB.raw(content)
}

    // 初始化 auth SQL 文件路径
    const INIT_COUPON_DB_FILE = path.join(__dirname, './coupon.sql')
    const initdbPromise = createInitdbPromise(INIT_COUPON_DB_FILE)
    .then((res) => {
      //process.exit(0)
      logger.mark("===============初始化数据库成功!===============")
    })

    module.exports = initdbPromise
