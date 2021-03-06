'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const engine = require('ejs-mate');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const RedisStore = require('connect-redis')(session);
const helmet = require('helmet');

const {router} = require('./application/routes/index');
const {api} = require('./application/routes/api');

const app = express();

app.set('views','./application/views');
app.set('view options', { layout:'./application/views/layout.ejs' });
app.set('view engine', 'ejs');
app.engine('ejs', engine);
app.use(express.static(__dirname + '/static'));

app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/application/views');
app.set('view options', { layout:'./application/views/layout.ejs' });
app.use('/static', express.static('static'));

app.use(function (req, res, next) {
    app.locals.route = req.url;
    next();
});

app.use(helmet());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const expiryDate = new Date( Date.now() + 60 * 60 * 1000 );

app.use(session({
    secret: 'cat',
    resave: true,
    saveUninitialized: true,
    store: new RedisStore({
        host: 'redis'
    }),
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 60000,
        expires: expiryDate
    }
}));

app.use(passport.initialize());
app.use(passport.session());
require('./application/authenticate/init')(passport);

app.use(flash());
app.use(function(req, res, next){
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.email = req.flash('email');
    res.locals.name = req.flash('name');
    res.locals.phone = req.flash('phone');
    res.locals.birth_date = req.flash('birth_date');
    next();
});
app.use(router, api);

app.set('views','./application/views');
app.set('view options', { layout:'./application/views/layout.ejs' });
app.set('view engine', 'ejs');
app.engine('ejs', engine);
app.use(express.static(__dirname + '/static'));

app.use(function(req, res) {
    res.status(404);
    res.render('pages/404.ejs');
});

module.exports = {app};

