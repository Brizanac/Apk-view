/*
Navicat MySQL Data Transfer

Source Server         : mysqltest
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : apkview

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2021-03-19 15:19:56
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `aplikacija`
-- ----------------------------
DROP TABLE IF EXISTS `aplikacija`;
CREATE TABLE `aplikacija` (
  `idaplikacija` int(11) NOT NULL AUTO_INCREMENT,
  `ap_naziv` varchar(255) DEFAULT NULL,
  `ap_opis` text DEFAULT NULL,
  PRIMARY KEY (`idaplikacija`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of aplikacija
-- ----------------------------
INSERT INTO `aplikacija` VALUES ('1', 'Mitar', 'Balkanski Spotify');
INSERT INTO `aplikacija` VALUES ('2', 'Mitros', null);

-- ----------------------------
-- Table structure for `datotekaupload`
-- ----------------------------
DROP TABLE IF EXISTS `datotekaupload`;
CREATE TABLE `datotekaupload` (
  `iddatotekaupload` int(11) NOT NULL AUTO_INCREMENT,
  `aplikacija_idaplikacija` int(11) NOT NULL,
  `korisnik_idkorisnik` int(11) NOT NULL,
  `du_verzija` varchar(255) DEFAULT NULL,
  `du_datumizmjene` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `du_opis` text DEFAULT NULL,
  `du_nazivdatoteka` varchar(255) NOT NULL,
  `du_nazivdatoteka_orig` varchar(255) NOT NULL,
  `du_putanja` varchar(255) NOT NULL,
  PRIMARY KEY (`iddatotekaupload`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of datotekaupload
-- ----------------------------
INSERT INTO `datotekaupload` VALUES ('11', '1', '1', '0.001', '2021-03-18 14:23:39', null, 'node_1616073819743.zip', 'node.zip', './datoteke/node_1616073819743.zip');
INSERT INTO `datotekaupload` VALUES ('14', '1', '1', '0.001', '2021-03-18 14:23:42', null, 'node_1616073822301.zip', 'node.zip', './datoteke/node_1616073822301.zip');

-- ----------------------------
-- Table structure for `korisnik`
-- ----------------------------
DROP TABLE IF EXISTS `korisnik`;
CREATE TABLE `korisnik` (
  `idkorisnik` int(11) NOT NULL AUTO_INCREMENT,
  `ko_email` varchar(255) DEFAULT NULL,
  `ko_pass` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idkorisnik`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of korisnik
-- ----------------------------
