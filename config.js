
var mongoskin = require('mongoskin');
//相关配置
var config = {
    session_secret: 'pixding',
    port:3111,
    theme:"default"
};

//全局静态变量和方法，供views层使用
config.static = {
    name: 'pixding',
    pagesize:10
}

exports.config = config;

exports.db = mongoskin.db("mongodb://127.0.0.1/lading"); //数据库连接串

