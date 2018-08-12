const express = require('express');
const passport = require('passport');
const router = express.Router();

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
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true })
    );

router.route('/signup')
    .get(function (req, res) {
        res.render('pages/signup.ejs', {message: req.flash('signupMessage') });
    })
    .post(
        passport.authenticate('local-signup', {
            successRedirect: '/profile',
            failureRedirect: '/signup',
            failureFlash: true })
    );

router.get('/profile', authenticationMiddleware, function(req, res) {
    res.render('profile.ejs', {
        user : req.user
    });
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});


module.exports = {router};
