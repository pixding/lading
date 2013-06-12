var postMod = require('../models/post.js');
var categoryMod = require('../models/category.js');
var config = require('../config.js').config;
var dateFormat = require('dateformat');
var data2xml = require('data2xml');
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


// URL: /feed
exports.feed = function (req, res) {
	if (!config.rss) {
    	res.statusCode = 404;
		res.send('Please set `rss` in config.js');
	}
	postMod.getByQuery({enable:1}, {limit:20}, function (err, result) {
    	if (err) {
			return next(err);
		}
		var rss_obj = {
			_attr: { version: '2.0' },
			channel: {
				title: config.rss.title,
				description: config.rss.description,
				link: config.rss.link,
				language: config.rss.language,
				item: []
			}
		};

		for (var i = 0; i < result.length; i++) {
			var post = result[i];
			rss_obj.channel.item.push({
				title: post.title,
				author: {
					name: config.rss.author.name
				},
				link: config.rss.link + '/post/' + post.unique,
				pubDate: dateFormat(new Date(post.createDate)),
				description: post.content
			});
		}
		var rss_content = data2xml({})('rss', rss_obj);
		res.contentType('application/xml');
		res.send(rss_content);
  });
};
