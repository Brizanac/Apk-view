/*
Navicat MySQL Data Transfer

Source Server         : mysqltest
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : apkview

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2021-04-08 11:59:40
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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of aplikacija
-- ----------------------------
INSERT INTO `aplikacija` VALUES ('1', 'MyGroStore', 'Aplikacija za prodaju artikala putem interneta b2b');
INSERT INTO `aplikacija` VALUES ('13', 'mojKafić', 'aplikacija za kafiće');

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
  `du_velicinedatoteke` varchar(155) DEFAULT NULL,
  PRIMARY KEY (`iddatotekaupload`),
  KEY `aplikacija_idaplikacija` (`aplikacija_idaplikacija`),
  CONSTRAINT `datotekaupload_ibfk_1` FOREIGN KEY (`aplikacija_idaplikacija`) REFERENCES `aplikacija` (`idaplikacija`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of datotekaupload
-- ----------------------------
INSERT INTO `datotekaupload` VALUES ('1', '1', '1', '1.0', '2021-04-02 10:49:48', 'bug fixes 1.1', 'datotekauploadPreuzmi_(11)_1617353369068.zip', 'datotekauploadPreuzmi (11).zip', './datoteke/datotekauploadPreuzmi_(11)_1617353369068.zip', '6048076');
INSERT INTO `datotekaupload` VALUES ('2', '1', '1', 'datoteka', '2021-04-02 12:39:34', 'fd', 'lab7_1617359974246.zip', 'lab7.zip', './datoteke/lab7_1617359974246.zip', '44297');
INSERT INTO `datotekaupload` VALUES ('4', '1', '1', 'datoteka', '2021-04-02 13:45:00', 'nesto novo', 'icons8-add-file-96_1617363900206.png', 'icons8-add-file-96.png', './datoteke/icons8-add-file-96_1617363900206.png', '2406');
INSERT INTO `datotekaupload` VALUES ('9', '13', '1', 'v0.1', '2021-04-08 07:56:40', 'Bug fixes', 'datotekauploadPreuzmi_(13)_1617861400886.zip', 'datotekauploadPreuzmi (13).zip', './datoteke/datotekauploadPreuzmi_(13)_1617861400886.zip', '6048076');
INSERT INTO `datotekaupload` VALUES ('10', '1', '1', 'verzija', '2021-04-08 09:30:28', 'opis', 'lab7_1617867028377.zip', 'lab7.zip', './datoteke/lab7_1617867028377.zip', '44297');

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
