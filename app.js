const express = require('express');
const fs = require('fs');
const Promise = require('bluebird');
const sqlite = require('sqlite');
const bodyParser = require('body-parser');
const engine = require('ejs-mate');

const app = express();

app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/app/views');
app.set('view options', { layout:'./app/views/layout.ejs' });
app.use('/static', express.static('static'));
require('./app/routes/index');

app.use(function (req, res, next) {
    app.locals.route = req.url;
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const dbPromise = sqlite.open('./database.sqlite', { Promise });

app.set('views','./app/views');
app.set('view options', { layout:'./app/views/layout.ejs' });
app.set('view engine', 'ejs');
app.engine('ejs', engine);
app.use(express.static(__dirname + '/static'));

module.exports = app;
module.exports = dbPromise;

