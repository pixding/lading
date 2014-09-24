var db = require('../config.js').db;

db.sh = db.bind('sh');

exports.updateByUnique = function (query, obj, callback) {
    db.sh.update(query, { $set: obj }, { upsert: true }, function (err, result) {
        callback(err, result);
    });
}
