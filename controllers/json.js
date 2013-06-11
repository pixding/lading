var fs = require('fs');
var path = require('path');
var upload_path = path.join(path.dirname(__dirname), 'static/upload');
var config = require('../config').config;
var dateFormat = require('dateformat');

exports.keupload = function(req, res, next) {
	var host = req.headers.host;
	var file = req.files.imgFile;
	if(file){
		var now = new Date();
		var d = dateFormat(now, "yyyymmdd");
		var imgpath = path.join(path.dirname(__dirname),'static/upload/'+d);
		fs.exists(imgpath,function(exist){
	  		if(!exist){
				fs.mkdir(imgpath,function(err){
					if(err){
						
						res.json({ error: 1, message: "出错了qq!" });
						return;
					}
					saveimg(function(err,url){
						if(err){
							res.json({ error: 1, message: "出错了!" });
						}
						res.json({ error: 0, url: url });
					})
					
				})
			}else{
				saveimg(function(err,url){
					if(err){
						res.json({ error: 1, message: "出错了!" });
					}
					res.json({ error: 0, url: url });
				})
			}
			//保存图片方法
			function saveimg(cb){
				var ext = path.extname(file.name); 
				var filename = dateFormat(now, "HHMMss") + Math.ceil(Math.random()*1000) + ext;
				var new_path = path.join(imgpath, filename);
				fs.rename(file.path, new_path, function(err) {
					if (err) {
						cb(err,null);
						return;
					}
					var url = "/upload/"+d+"/"+filename;
					cb(null,url);
				});
			}
		});
	}else{
		res.json({ error: 1, message: "出错了!" });
	}
};