const bcrypt = require('bcrypt-nodejs');

const {dbPromise} = require('../../db.js');
const {User} = require('../models/users');

async function create (req, res, next) {
    try {
        const db = await dbPromise;
        if (!req.body.email) {
            req.flash('error', 'Please, enter your email');
            res.render('pages/signup.ejs', {
                message: req.flash('error'),
                password: req.body.password,
                name: req.body.name,
                phone: req.body.phone,
                birth_date: req.body.birth_date
            });
        }
        if (!req.body.password) {
            const email = req.body.email;

            req.flash('error', 'Please, enter your password');
            res.render('pages/signup.ejs', {
                message: req.flash('error'),
                email: email,
                name: req.body.name,
                phone: req.body.phone,
                birth_date: req.body.birth_date
            });
        }
        if (!req.body.name) {
            req.flash('error', 'Please, enter your name');
            res.render('pages/signup.ejs', {
                message: req.flash('error'),
                email: req.body.email,
                password: req.body.password,
                phone: req.body.phone,
                birth_date: req.body.birth_date
            });
        }
        else {
            const hashedPassword = await new Promise((resolve, reject) => {
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) {
                        return next(err);
                    }
                    bcrypt.hash(req.body.password, salt, function(err, hash) {
                        if (err) reject(err);
                        resolve(hash);
                    });
                });
            });
            await User.create(db, req.body.email, hashedPassword, req.body.name, req.body.phone, req.body.birth_date);
            res.status(201);
            res.send(user);
        }
        // res.render('pages/profile.ejs', {user : req.user});
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
        const user = await User.update(db, req.body.password, req.body.name, req.body.phone, req.body.birth_date, req.params.userId);
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

async function findUser (email) {
    try {
        const db = await dbPromise;
        return await User.find(db, email);
    } catch (err) {
        return err;
    }
}

module.exports = {create, readAllUsers, readUser, update, deleteUser, findUser};