const {dbPromise} = require('../../db.js');
const {User} = require('../models/users');

async function create (req, res, next) {
    try {
        const db = await dbPromise;
        User.create(db, req.body.email, req.body.password, req.body.name, req.body.phone, req.body.birth_date);
        res.redirect('/home');
    } catch (err) {
        next(err);
    }
}

async function readAllUsers (req, res, next) {
    try {
        const db = await dbPromise;
        const users = await Promise.all([
            User.readAllUsers(db)
        ]);
        res.send(users);
    } catch (err) {
        next(err);
    }
}

async function readUser (req, res, next) {
    try {
        const db = await dbPromise;
        const user = User.readUser(db, req.params.id);
        res.json(user);
    } catch (err) {
        next(err);
    }
}

async function update (req, res, next) {
    try {
        const db = await dbPromise;
        User.update(db, req.body.password, req.body.name, req.body.phone, req.body.birth_date);
        res.redirect('/home');
    } catch (err) {
        next(err);
    }
}

async function deleteUser (req, res, next) {
    try {
        const db = await dbPromise;
        User.delete(db, req.params.id);
        res.redirect('/home');
    } catch (err) {
        next(err);
    }
}

module.exports = {create, readAllUsers, readUser, update, deleteUser};
