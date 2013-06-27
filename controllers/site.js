var postMod = require('../models/post.js');
var categoryMod = require('../models/category.js');
var config = require('../config.js').config;
var dateFormat = require('dateformat');
var data2xml = require('data2xml');
var EventProxy = require('eventproxy').EventProxy;
exports.index = function(req,res,next){
	
	var page = req.params.page || 1;
    page = parseInt(page, 10) > 0 ? parseInt(page, 10) : 1;
    var limit = config.static.pagesize;
    
    var proxy = new EventProxy();
	var render = function(postList,total,tagList,categoryList){
		var totalpage = Math.ceil(total/ limit) || 1;
		if (page > totalpage) {
            page = totalpage;
        }
	
	
		res.render("theme/"+config.theme+"/index", { layout: false, postList: postList, page: page, total: totalpage,tagList:tagList,categoryList:categoryList });
	}
	
	proxy.assign("getPostList","getTotal","getTagList","getCategoryList",render);
	
	//获取文章列表
	postMod.getByQuery({enable:"1"}, {sort: { createDate: -1} }, function (err, result) {
        if (err) {
            return next();
        }
        var total = result.length;
        proxy.trigger("getTotal",total);
        var tags = [];
        for(var i=0;i<result.length;i++){
	        tags = tags.concat(result[i].tags);
        }
        proxy.trigger("getTagList",tags);
        
        var postList = result.slice((page - 1) * limit,limit);
        proxy.trigger("getPostList",postList)
    });
	
	//获取分类列表
	categoryMod.getByQuery({},{},function (err, result) {
		if(err){
			return next();
		}
		proxy.trigger("getCategoryList",result)
	});
}

//文章展示
exports.post = function(req,res,next){
	var unique = req.params.unique;
	postMod.getByUnique(unique,function(err,post){
		if(err){
			return next();
		}
		if(post){
			res.render("theme/"+config.theme+"/post",{layout:false,post:post});
		}else{
			return next();
		}
	})
}

//分类文章列表
exports.cateList = function(req,res,next){
	var cateUnique = req.params.unique;
	postMod.getByQuery({"category.key":cateUnique,enable:"1"},{},function(err,result){
		if(err){
			return next();
		}
		if(result.length>0){
			console.log(result.length);
			var tags = [];
	        for(var i=0;i<result.length;i++){
		        tags = tags.concat(result[i].tags);
	        }
			categoryMod.getByQuery({},{},function (err, cateList) {
				if(err){
					return next();
				}
				res.render("theme/"+config.theme+"/index", { layout: false, postList: result, page: 1, total: 1,tagList:tags,categoryList:cateList });
			});
		}else{
			return next();
		}
	})
}

//标签文章列表
exports.tagList = function(req,res,next){
	var tag = req.params.tag;
	console.log(tag);
	postMod.getByQuery({tags:{$in:[tag]},enable:"1"},{},function(err,result){
		if(err){
			
			console.log(err);
			return next();
		}
		if(result.length>0){
			console.log(result.length);
			var tags = [];
	        for(var i=0;i<result.length;i++){
		        tags = tags.concat(result[i].tags);
	        }
			categoryMod.getByQuery({},{},function (err, cateList) {
				if(err){
					
					console.log(3);
					return next();
				}
				res.render("theme/"+config.theme+"/index", { layout: false, postList: result, page: 1, total: 1,tagList:tags,categoryList:cateList });
			});
		}else{
			
			console.log();
			return next();
		}
	})
}


// URL: /feed
exports.feed = function (req, res) {
	if (!config.rss) {
    	res.statusCode = 404;
		res.send('Please set `rss` in config.js');
	}
	postMod.getByQuery({enable:"1"}, {limit:20,sort: { createDate: -1} }, function (err, result) {
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

//文章归档
exports.map = function(req,res,next){
	postMod.getByQuery({enable:"1"}, {sort: { createDate: -1} }, function (err, result) {
		if(err){
			return next();
		}
		res.render("theme/"+config.theme+"/map",{layout:false,postList:result});
	});
}

//sitemap.xml
exports.sitemap = function(req,res,next){
	postMod.getByQuery({enable:"1"}, {sort: { createDate: -1} }, function (err, result) {
		if(err){
			return next();
		}
		res.set('Content-Type', 'text/xml');
		res.render("theme/"+config.theme+"/sitemap",{layout:false,postList:result});
	});
}

//404
exports.go404 = function(req,res){
	
	res.render("theme/"+config.theme+"/404",{layout:false});
}
