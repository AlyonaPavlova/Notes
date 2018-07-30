const db = require('../db');

exports.all = function (cb) {
    db.get().collection('artists').find().toArray(function (err, docs) {
        cb(err, docs);
    })
};

exports.create = function (user, cb) {
    db.get().collection('users').insert(user, function (err, result) {
        cb(err, result);
    })
};

