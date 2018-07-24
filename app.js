const express = require('express');

let app = express();
const pages = require('./app/controllers/pages');

app.use(express.static('/static'));

app.get('/', function (req, res) { res.redirect('home') });
app.get('/home', pages.home);

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

module.exports = app;