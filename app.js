const express = require('express');
const pages = require('./app/controllers/pages');

const app = express();

app.set('views','./app/views');
app.set('view engine', 'ejs');
app.use(express.static('/static'));

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