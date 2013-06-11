var postMod = require('../models/post.js');
var categoryMod = require('../models/category.js');
var config = require('../config.js').config;
var dateFormat = require('dateformat');

//标签列表
exports.categoryList = function (req, res, next) {
    categoryMod.getByQuery({}, {}, function (err, result) {
        if (err) {
            return next();
        }
        res.render("admin/category_list", { layout: false, list: result });
    });
}

//添加标签
exports.categoryEdit = function (req, res, next) {
    if (req.method == "GET") {
        res.render("admin/category_edit", { layout: false });
    }
    if (req.method == "POST") {
        var createDate = dateFormat(new Date(), "yyyy-mm-dd");
        var category = {
            name: req.body.name,
            unique: req.body.unique,
            createDate: createDate
        };
        categoryMod.save(category, function (err, result) {
            if (err) {
                return next();
            }
            res.redirect("/admin/categoryList");
        });

    }

}

//更新标签
exports.categoryUpdate = function (req, res, next) {
    var id = req.params.id;
    if (req.method == "GET") {
        console.log(id);
        categoryMod.getById(id, function (err, result) {
            if (result) {
                res.render("admin/category_update", { layout: false, category: result });
            } else {
                return next();
            }
        });
    }
    if (req.method == "POST") {
        var createDate = dateFormat(new Date(), "yyyy-mm-dd");
        var category = {
            name: req.body.name,
            unique: req.body.unique,
            createDate: createDate
        };
        categoryMod.update(id, category, function (err, result) {
            if (err) {
                return next();
            }
            res.redirect("/admin/categoryList");
        });
    }
}
//移除标签
exports.categoryRemove = function (req, res, next) {
    var id = req.body.id;
    if (id) {
        categoryMod.removeById(id, function (err, result) {
            if (err) {
                res.json({ res: -2 });
            }
            res.json({ res: 1 });
        });
    } else {
        res.json({ res: -1 });
    }
}

//文章列表
exports.postList = function (req, res, next) {
    var page = req.query.page || 1;
    page = parseInt(page, 10) > 0 ? parseInt(page, 10) : 1;
    var limit = config.static.pagesize;

	
    postMod.count({}, function (err, count) {
        if (err) {
            return next();
        }
        var totalpage = Math.ceil(count/ limit) || 1;
        if (page > totalpage) {
            page = totalpage;
        }
        postMod.getByQuery({}, { skip: (page - 1) * limit, limit: limit, sort: { createDate: -1, _id: -1} }, function (err, result) {
            if (err) {
                return next();
            }
            res.render("admin/post_list", { layout: false, list: result, page: page, total: count });
        });
    });
}

//添加文章
exports.postEdit = function (req, res, next) {
    if (req.method == "GET") {

        categoryMod.getByQuery({}, {}, function (err, result) {
            if (err) {
                return next();
            }
            res.render("admin/post_edit", { layout: false, catelist: result });
        });
    }
    if (req.method == "POST") {
        var createDate = dateFormat(new Date(), "yyyy-mm-dd");
        if (req.body.createDate) {
            createDate = dateFormat(req.body.createDate, "yyyy-mm-dd");
        }
        var post = {
            title: req.body.title,
            unique: req.body.unique,
            des: req.body.des,
            tags: req.body.tags.split(','),
            category: { key: req.body.cateKey, value: req.body.cateValue },
            content: req.body.content,
            visit: 0,
            enable:1,
            createDate: createDate
        };
        postMod.save(post, function (err, result) {
            if (err) {
                res.json({ res: -1, msg: err });
            }
            res.json({ res: 1 });
        });
    }
}

//更新文章
exports.postUpdate = function (req, res, next) {
    var id = req.params.id;
    if (req.method == "GET") {
        postMod.getById(id, function (err, result) {
            if (err) {
                return next();
            }
            if (result) {
                categoryMod.getByQuery({}, {}, function (err, catelist) {
                    if (err) {
                        return next();
                    }
                    res.render("admin/post_update", { layout: false, post: result,catelist:catelist });
                });
            } else {
                return next();
            }
        });
    }
    if (req.method == "POST") {
        var createDate = dateFormat(new Date(), "yyyy-mm-dd");
        if (req.body.createDate) {
            createDate = dateFormat(req.body.createDate, "yyyy-mm-dd");
        }
        var post = {
            title: req.body.title,
            unique: req.body.unique,
            des: req.body.des,
            tags: req.body.tags.split(','),
            category: { key: req.body.cateKey, value: req.body.cateValue },
            content: req.body.content,
            createDate: createDate
        };
        postMod.update(id, post, function (err, result) {
            if (err) {
                res.json({ res: -1, msg: err });
            }
            res.json({ res: 1 });
        });
    }
}
//设置文章状态 1正常 0不显示
exports.postEnable = function (req, res, next) {
    var id = req.body.id;
    var enable = req.body.enable;
    var post = {
        enable: enable
    }
    postMod.update(id, post, function (err, result) {
        if (err) {
            res.json({ res: -1, msg: err });
        }
        res.json({ res: 1 });
    });
}

//移除文章
exports.postRemove = function (req, res, next) {
    var id = req.body.id;
    if (id) {
        postMod.removeById(id, function (err, result) {
            if (err) {
                res.json({ res: -2 });
            }
            res.json({ res: 1 });
        });
    } else {
        res.json({ res: -1 });
    }
}

exports.upload = function(req,res,next){
	
}

exports.index = function (req, res, next) {
    var page = isNaN(parseInt(req.params.page)) ? 1 : parseInt(req.params.page);
    if (page < 1) {
        page = 1;
    }
    res.render('admin/index', { layout: false });
}

exports.post_edit = function (req, res, next) {
    if (req.method == "GET") {
        var id = req.params.id;

    }
}