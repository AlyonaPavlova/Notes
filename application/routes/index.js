const express = require('express');
const passport = require('passport');
const router = express.Router();

const Users = require('../controllers/usersController');
const Notes = require('../controllers/notesController');
const pages = require('../controllers/pages');
const authenticationMiddleware = require('../authenticate/middleware');

router.get('/', function (req, res) { res.redirect('home');});
router.get('/home', pages.home);
router.get('/features', pages.features);
router.get('/news', pages.news);
router.get('/logs', pages.logs);

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
    .post(Users.create);

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
