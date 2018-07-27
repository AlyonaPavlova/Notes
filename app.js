const express = require('express');
const fs = require('fs');
const Promise = require('bluebird');
const sqlite = require('sqlite');
const bodyParser = require('body-parser');
const engine = require('ejs-mate');

const app = express();
const pages = require(__dirname + '/app/controllers/pages');
const port = process.env.PORT || 3000;
const users = [];

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
app.engine('ejs', engine);
app.use(express.static(__dirname + '/static'));

app.use(function (req, res, next) {
    app.locals.route = req.url;
    next();
});

app.get('/', function (req, res) { res.redirect('home');});
app.get('/home', pages.home);
app.get('/features', pages.features);
app.get('/news', pages.news);

app.post('/users', function (req, res) {
    const user = req.body;
    users.push({
        id: users.id,
        email: users.email,
        name: user.name,
        phone: users.phone,
        birthDate: users.birth_date,
        notesCount: users.notes_count
    });
    res.send('Successfully registered')
});

app.post('/users', function (req, res) {
    const user = req.body;
    fs.appendToFile('users.txt', JSON.stringify({name: user.name, age: user.age }), (err) => {
        res.send('Successfully registered')
    })
});

app.listen(port, function () {
    console.log('App listening on port 3000!');
});

module.exports = app;

