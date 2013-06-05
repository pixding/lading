var db = require('../config.js').db;
db.bind('category');

exports.save = function (obj, callback) {
    db.category.insert(obj, function (err, result) {
        callback(err, null);
    });
};

exports.getById = function(id,callback){
    db.category.findOne({ _id: db.ObjectID.createFromHexString(id)}, function (err, result) {
        callback(err,result);
    });
}
exports.removeById = function (id, callback) {
    db.category.remove({ _id: db.ObjectID.createFromHexString(id) }, function (err, result) {
        callback(err, result);
    });
}
exports.getByQuery = function (query, options, callback) {
    db.category.find(query, options).toArray(callback);
};

exports.update = function (id, category, callback) {
    db.category.update({ _id: db.ObjectID.createFromHexString(id) }, { $set: category }, function (err, result) {
        callback(err, result);
    })
};
