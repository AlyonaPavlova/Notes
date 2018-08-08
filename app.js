const express = require('express');
const bodyParser = require('body-parser');
const engine = require('ejs-mate');

const {router} = require('./application/routes/index');
const {api} = require('./application/routes/api');

const app = express();

app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/application/views');
app.set('view options', { layout:'./application/views/layout.ejs' });
app.use('/static', express.static('static'));
require('./application/routes/index');

app.use(function (req, res, next) {
    app.locals.route = req.url;
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(router, api);

app.set('views','./application/views');
app.set('view options', { layout:'./application/views/layout.ejs' });
app.set('view engine', 'ejs');
app.engine('ejs', engine);
app.use(express.static(__dirname + '/static'));

module.exports = {app};

