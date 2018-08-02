const express = require('express');
const fs = require('fs');
const Promise = require('bluebird');
const sqlite = require('sqlite');
const bodyParser = require('body-parser');
const engine = require('ejs-mate');

const app = express();
const pages = require(__dirname + '/app/controllers/pages');
const port = process.env.PORT || 3000;

app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/app/views');
app.set('view options', { layout:'./app/views/layout.ejs' });
app.use('/static', express.static('static'));

app.use(function (req, res, next) {
    app.locals.route = req.url;
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const dbPromise = sqlite.open('./database.sqlite', { Promise });
// const dbPromise = sqlite.open('./database.sqlite', { cached: true });

app.set('views','./app/views');
app.set('view options', { layout:'./app/views/layout.ejs' });
app.set('view engine', 'ejs');
app.engine('ejs', engine);
app.use(express.static(__dirname + '/static'));

app.get('/', function (req, res) { res.redirect('home');});
app.get('/home', pages.home);
app.get('/features', pages.features);
app.get('/news', pages.news);

app.listen(port, function () {
    console.log('App listening on port 3000!');
});

module.exports = require(__dirname + './app/main');
module.export = dbPromise;

