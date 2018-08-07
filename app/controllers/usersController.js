const dbPromise = require('../../app');
const Users = require('../models/users');

async function create (req, res, next) {
    try {
        const db = await dbPromise;
        Users.create(db, req.body.email, req.body.password, req.body.name, req.body.phone, req.body.birth_date);
        res.redirect('api/v1/home');
    } catch (err) {
        next(err);
    }
}

async function readAllUsers (req, res, next) {
    try {
        const db = await dbPromise;
        const users = Users.readAllUsers(db);
        res.json(users);
    } catch (err) {
        next(err);
    }
}

async function readUser (req, res, next) {
    try {
        const db = await dbPromise;
        const user = Users.readUser(db, req.params.id);
        res.json(user);
    } catch (err) {
        next(err);
    }
}

async function update (req, res, next) {
    try {
        const db = await dbPromise;
        Users.update(db, req.body.password, req.body.name, req.body.phone, req.body.birth_date);
        res.redirect('api/v1/home');
    } catch (err) {
        next(err);
    }
}

async function deleteUser (req, res, next) {
    try {
        const db = await dbPromise;
        Users.delete(db, req.params.id);
        res.redirect('api/v1/home');
    } catch (err) {
        next(err);
    }
}

module.exports = {create, readAllUsers, readUser, update, deleteUser};
