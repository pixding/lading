/**
* User: willerce
* Date: 7/30/12
* Time: 12:23 AM
*/
var admin = require('./controllers/admin');

module.exports = function (app) {
    /* admin */
    app.get('/admin/', admin.index);
    app.get('/admin/categoryList', admin.categoryList);
    app.get('/admin/categoryUpdate/:id', admin.categoryUpdate);
    app.get('/admin/categoryEdit', admin.categoryEdit);
    app.post('/admin/categoryEdit', admin.categoryEdit);
    app.post('/admin/categoryUpdate/:id', admin.categoryUpdate);
    app.post('/admin/categoryRemove', admin.categoryRemove);

    app.get('/admin/postList', admin.postList);
    app.get('/admin/postEdit', admin.postEdit);
    app.get('/admin/postUpdate/:id', admin.postUpdate);
    app.post('/admin/postEdit', admin.postEdit);
    app.post('/admin/postUpdate/:id', admin.postUpdate);
    app.post('/admin/postEnable', admin.postEnable);
    app.post('/admin/postRemove', admin.postRemove);
};