const bcrypt = require('bcrypt-nodejs');

const {dbPromise} = require('../../db.js');
const {User} = require('../models/users');

async function create (req, res, next) {
    try {
        const db = await dbPromise;

        if (!req.body.email || !req.body.password || !req.body.name) {
            res.status(400);
            res.send('400: User Not Created');
        }
        else {
            const hashedPassword = await new Promise((resolve, reject) => {
                bcrypt.hash(req.body.password, 10, function(err, hash) {
                    if (err) reject(err);
                    resolve(hash);
                });
            });
            const user = await User.create(db, req.body.email, hashedPassword, req.body.name, req.body.phone, req.body.birth_date);
            res.status(201);
            res.send(user);
        }
    } catch (err) {
        next(err);
    }
}

async function readAllUsers (req, res, next) {
    try {
        const db = await dbPromise;
        const users = await User.readAllUsers(db);
        res.send(users);
    } catch (err) {
        next(err);
    }
}

async function readUser (req, res, next) {
    try {
        const db = await dbPromise;
        const user = await User.readUser(db, req.params.id);

        if (!user) {
            res.status(404);
            res.send('404: User Not Found');
        }
        res.send(user);
    } catch (err) {
        next(err);
    }
}

async function update (req, res, next) {
    try {
        const db = await dbPromise;
        const user = await User.update(db, req.body.password, req.body.name, req.body.phone, req.body.birth_date, req.params.id);
        res.send(user);
    } catch (err) {
        next(err);
    }
}

async function deleteUser (req, res, next) {
    try {
        const db = await dbPromise;
        await User.delete(db, req.params.id);
        res.send('You are removed from the system!');
    } catch (err) {
        next(err);
    }
}

// async function findUser (req, res, next, email, cb) {
//     try {
//         const db = await dbPromise;
//         const user = await User.find(db, req.body.email);
//
//         if (email === user.req.body.email) {
//             return cb(null, user)
//         }
//         return callback(null);
//
//         res.send(user);
//     } catch (err) {
//         next(err);
//     }
// }

async function findUser (req, res, next) {
    try {
        const db = await dbPromise;
        const user = await User.find(db, req.body.email);
        res.send(user);
    } catch (err) {
        next(err);
    }
}

module.exports = {create, readAllUsers, readUser, update, deleteUser, findUser};