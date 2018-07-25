const express = require('express');
const Promise = require('bluebird');
const sqlite = require('sqlite');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const pages = require('./app/controllers/pages');
const ejsLocals = require('ejs-locals');

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));
require('./app/routes');

const dbPromise = Promise.resolve()
    .then(() => sqlite.open('./database.sqlite', { Promise }))
    .then(db => db.migrate({ force: 'last' }));

app.get('/post/:id', async (req, res, next) => {
    try {
        const db = await dbPromise;
        const [post, categories] = await Promise.all([
            db.get('SELECT * FROM Post WHERE id = ?', req.params.id),
            db.all('SELECT * FROM Category')
        ]);
        res.render('post', { post, categories });
    } catch (err) {
        next(err);
    }
});

app.set('views','./app/views');
app.set('view options', { layout:'./app/views/layout.ejs' });
app.set('view engine', 'ejs');
app.engine('ejs', ejsLocals);
app.use(express.static('/static'));

app.use(function (req, res, next) {
    app.locals.route = req.url;
    next();
});

app.get('/', function (req, res) { res.redirect('home');});
app.get('/home', pages.home);
app.get('/features', pages.features);
app.get('/news', pages.news);

app.listen(port, function () {
    console.log('App listening on port 3000!');
});

module.exports = app;
