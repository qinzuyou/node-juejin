CREATE DATABASE IF NOT EXISTS `juejin`; 
USE `juejin`;
CREATE TABLE IF NOT EXISTS article (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `author` VARCHAR(255),
    `releasetime` DATETIME default CURRENT_TIMESTAMP,
    `give` INT default 0,
    `collect` INT default 0,
    `content` TEXT,
    `title` VARCHAR(255),
    `hits` INT default 0,
    `type` VARCHAR(255)
)

CREATE TABLE IF NOT EXISTS user (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `account` VARCHAR(255),
    `password` VARCHAR(255),
    `nickname` VARCHAR(255),
    `antistop` VARCHAR(255),
    `profile` VARCHAR(255),
    `regtime` DATETIME default CURRENT_TIMESTAMP
)

CREATE TABLE IF NOT EXISTS posttype (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `typeId` VARCHAR(255),
    `typeName` VARCHAR(255)
)