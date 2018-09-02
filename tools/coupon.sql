/*
 Navicat Premium Data Transfer

 Source Server         : Localhost
 Source Server Type    : MySQL
 Source Server Version : 50717
 Source Host           : localhost
 Source Database       : cAuth

 Target Server Type    : MySQL
 Target Server Version : 50717
 File Encoding         : utf-8

 Date: 08/10/2017 22:22:52 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `coupon-pool`
-- ----------------------------
CREATE TABLE IF NOT EXISTS `coupon-pool` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `tenant_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '租户id',
  `coupon-code` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '劵码',
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '劵面名称',
  `face_value` int(100) NOT NULL DEFAULT '0' COMMENT '面值',
  `description` varchar(300) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '使用说明',
  `is_received` int(1) NOT NULL DEFAULT '0' COMMENT '是否领取',
  `receive_date` bigint(20) DEFAULT NULL COMMENT '领取日期',
  `received_customer` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '领取客户',
  `effective_start_date` bigint(20) DEFAULT NULL COMMENT '有效日期开始时间',
  `effective_end_date` bigint(20) DEFAULT NULL COMMENT '有效日期结束时间',
  `is_write_off` int(1) NOT NULL DEFAULT '0' COMMENT '是否核销',
  `write_of_date` bigint(20) DEFAULT NULL COMMENT '核销日期',
  `write_of_contact` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '核销联系人',
  `status` int(2) DEFAULT NULL COMMENT '状态',
  `comment` varchar(300) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`)  
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='优惠卷池';

SET FOREIGN_KEY_CHECKS = 1;
