/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80031
 Source Host           : localhost:3306
 Source Schema         : juejin

 Target Server Type    : MySQL
 Target Server Version : 80031
 File Encoding         : 65001

 Date: 15/02/2023 20:57:28
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for posttype
-- ----------------------------
DROP TABLE IF EXISTS `posttype`;
CREATE TABLE `posttype`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `typeId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `typeName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of posttype
-- ----------------------------
INSERT INTO `posttype` VALUES (1, '001', 'Java');
INSERT INTO `posttype` VALUES (2, '002', 'Python');
INSERT INTO `posttype` VALUES (3, '003', 'JavaScript');
INSERT INTO `posttype` VALUES (4, '004', 'CSS');
INSERT INTO `posttype` VALUES (5, '005', 'HTML');
INSERT INTO `posttype` VALUES (6, '006', 'Linux');
INSERT INTO `posttype` VALUES (7, '007', 'Ubuntu');
INSERT INTO `posttype` VALUES (8, '008', '前端');
INSERT INTO `posttype` VALUES (9, '009', '后端');
INSERT INTO `posttype` VALUES (10, '010', '数据分析');
INSERT INTO `posttype` VALUES (11, '011', '数据可视化');

SET FOREIGN_KEY_CHECKS = 1;
