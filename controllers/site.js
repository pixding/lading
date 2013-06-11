var postMod = require('../models/post.js');
var categoryMod = require('../models/category.js');
var config = require('../config.js').config;
var dateFormat = require('dateformat');
exports.index = function(req,res,next){
	
	var page = req.params.page || 1;
    page = parseInt(page, 10) > 0 ? parseInt(page, 10) : 1;
    var limit = config.static.pagesize;

    postMod.count({enable:1}, function (err, count) {
        if (err) {
            return next();
        }
        var totalpage = Math.ceil(count/ limit) || 1;
        if (page > totalpage) {
            page = totalpage;
        }
        postMod.getByQuery({enable:1}, { skip: (page - 1) * limit, limit: limit, sort: { createDate: -1, _id: -1} }, function (err, result) {
            if (err) {
                return next();
            }
            res.render("theme/"+config.theme+"/index", { layout: false, list: result, page: page, total: count });
        });
    });

}
