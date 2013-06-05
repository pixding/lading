var db = require('../config.js').db;
db.bind('post');

exports.save = function (obj, callback) {
    db.post.insert(obj, function (err, result) {
        callback(err, null);
    });
};

exports.getById = function (id, callback) {
    db.post.findOne({ _id: db.ObjectID.createFromHexString(id) }, function (err, result) {
        callback(err, result);
    });
}
exports.removeById = function (id, callback) {
    db.post.remove({ _id: db.ObjectID.createFromHexString(id) }, function (err, result) {
        callback(err, result);
    });
}
exports.getByQuery = function (query, options, callback) {
    db.post.find(query, options).toArray(callback);
};

exports.update = function (id, category, callback) {
    db.post.update({ _id: db.ObjectID.createFromHexString(id) }, { $set: category }, function (err, result) {
        callback(err, result);
    })
};

exports.count = function (query, callback) {
    db.post.count(query, function (err, count) {
        callback(err, count);
    });
};
