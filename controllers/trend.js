
var config = require('../config.js').config;
var dateFormat = require('dateformat');
var EventProxy = require('eventproxy').EventProxy;
exports.index = function(req,res,next){
	res.render("theme/"+config.theme+"/trend", { layout: false});
}