const Users = require('../models/users');

exports.all = function (req, res) {
  Users.all(function (err, docs) {
      if (err) {
          console.log(err);
          return res.sendStatus(500);
      }
      res.send(docs);
  })
};

exports.create = function (req, res) {
    let user = {
        name: req.body.name
    };
    Users.create(user, function (err) {
        if(err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(user);
    })
};