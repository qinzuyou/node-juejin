### 数据库名 JueJin
```sql
CREATE DATABASE IF NOT EXISTS juejin; 
USE juejin;
```
### 文章表表名 `article`

|字段名意义| 字段名|备注|
|---|---|---|
|id|id|自增唯一|
|作者名|author||
|发布时间|releasetime|默认当前时间|
|点赞数|give|默认为0|
|收藏数|collect|默认为0|
|文章内容|content||
|标题|title||
|点击数|hits|默认为0|
|文章类型|type||

```sql
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
```

### 用户表 `user`
|字段意义|字段名|备注|
|---|---|---|
|id|id|自增唯一|
|账号|account|
|密码|password|
|昵称|nickname|
|关键词|antistop|数组|
|头像|profile|
|注册时间|regtime|
```sql
Create table if not exists user (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `account` VARCHAR(255),
    `password` VARCHAR(255),
    `nickname` VARCHAR(255),
    `antistop` VARCHAR(255),
    `profile` VARCHAR(255),
    `regtime` DATETIME default CURRENT_TIMESTAMP
)
```

### 文章类型表 posttype
|字段意义|字段名|备注|
|---|---|---|
|id|id|自增唯一|
|类型ID|typeid||
|类型名|typename|

```sql
Create table if not exists posttype (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `typeId` VARCHAR(255),
    `typeName` VARCHAR(255)
)
```