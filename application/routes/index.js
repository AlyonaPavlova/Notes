const express = require('express');
const passport = require('passport');
const router = express.Router();

const Users = require('../controllers/usersController');
const pages = require('../controllers/pages');
const authenticationMiddleware = require('../authenticate/middleware');

router.get('/', function (req, res) { res.redirect('home');});
router.get('/home', pages.home);
router.get('/features', pages.features);
router.get('/news', pages.news);

router.route('/login')
    .get(function (req, res) {
        res.render('pages/login.ejs', {message: req.flash('loginMessage') });
    })
    .post(
        passport.authenticate('local-login', {
            successRedirect: '/profile',
            failureRedirect: '/login',
            failureFlash: true })
    );

router.route('/signup')
    .get(function (req, res) {
        res.render('pages/signup.ejs', {message: req.flash('error') });
    })
    .post(async function (req, res) {
        if (!req.body.email || !req.body.password || !req.body.name) {
            // res.render('register', { error: 'Email and password required.' });
            req.flash('error', 'Please, enter your email, password and name');
        } else {
            Users.create;
        }
        res.redirect('/profile');
    });

router.get('/profile', authenticationMiddleware, function(req, res) {
    res.render('pages/profile.ejs', {
        user : req.user
    });
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = {router};
