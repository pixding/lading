﻿
var mongoskin = require('mongoskin');
//相关配置
var config = {
    session_secret: 'session_pixding',
    cookie_secret:'cookie_pixding',
    port:3111,
    theme:"default"
};

//全局静态变量和方法，供views层使用
config.static = {
    name: 'pixding',
    pagesize:10
}

config.rss = {
	max_rss_items: 20,
	title: "拉丁",
	description: "拉丁的博文",
	link:"http://lading.me",
	language: "zh-cn",
	managingEditor: "djqq1987@gmail.com",
	author: {
		name: "pixding",
		uri: "http://lading.me"
	}
};

exports.config = config;

exports.db = mongoskin.db("mongodb://127.0.0.1/lading"); //数据库连接串

