/**
* User: willerce
* Date: 7/30/12
* Time: 12:23 AM
*/
var json = require('./controllers/json');
var admin = require('./controllers/admin');
var site = require('./controllers/site');
var trend = require('./controllers/trend');


module.exports = function (app) {
    /* admin */
    app.get('/admin/login',admin.login);
    app.post('/admin/login',admin.login);
    
    app.get('/admin/', admin.auth_user, admin.index);
    app.get('/admin/categoryList',admin.auth_user, admin.categoryList);
    app.get('/admin/categoryUpdate/:id',admin.auth_user, admin.categoryUpdate);
    app.get('/admin/categoryEdit', admin.auth_user,admin.categoryEdit);
    app.post('/admin/categoryEdit',admin.auth_user, admin.categoryEdit);
    app.post('/admin/categoryUpdate/:id',admin.auth_user, admin.categoryUpdate);
    app.post('/admin/categoryRemove',admin.auth_user, admin.categoryRemove);

    app.get('/admin/postList',admin.auth_user, admin.postList);
    app.get('/admin/postEdit',admin.auth_user, admin.postEdit);
    app.get('/admin/postUpdate/:id',admin.auth_user, admin.postUpdate);
    app.post('/admin/postEdit',admin.auth_user,admin.postEdit);
    app.post('/admin/postUpdate/:id',admin.auth_user, admin.postUpdate);
    app.post('/admin/postEnable',admin.auth_user, admin.postEnable);
    app.post('/admin/postRemove',admin.auth_user, admin.postRemove);
    
    app.post('/admin/keupload',admin.auth_user,json.keupload);
    
    /*index*/
    app.get('/',site.index);
    app.get('/post/:unique',site.post);
    app.get('/category/:unique',site.cateList);
    app.get('/tag/:tag',site.tagList);
    app.get('/p:page',site.index);
    app.get('/feed',site.feed);
    app.get('/map',site.map);
    app.get('/sitemap.xml',site.sitemap);
    
    /*trend*/
    app.get('/jianfei',trend.index);
    
	app.get('/weixin',function(req,res,next){
		var echostr = req.query.echostr;
		res.send(echostr);
	});

    app.get('/lvyouquan',admin.lvyouquanC);
    app.get('/lvyouquansh',admin.lvyouquansh);
    app.get('/admin/lvyouquanshlist',admin.auth_user,admin.lvyouquanshlist);

    app.get('*',site.go404);
};