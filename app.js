const express = require('express');
const engine = require('ejs-mate');
const app = express();
const pages = require(__dirname + '/app/controllers/pages');

app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/app/views');
app.set('view options', { layout:'./app/views/layout.ejs' });
app.use('/static', express.static('static'));

app.use(function (req, res, next) {
    app.locals.route = req.url;
    next();
});

app.get('/', function (req, res) { res.redirect('home');});
app.get('/home', pages.home);
app.get('/features', pages.features);
app.get('/news', pages.news);

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

module.exports = app;
