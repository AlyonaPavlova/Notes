const express = require('express');
const fs = require('fs');
const Promise = require('bluebird');
const sqlite = require('sqlite');
const bodyParser = require('body-parser');
const engine = require('ejs-mate');

const {router} = require('./app/routes/index');
const {api} = require('./app/routes/api');

const application = express();

application.engine('ejs', engine);
application.set('view engine', 'ejs');
application.set('views', __dirname + '/application/views');
application.set('view options', { layout:'./application/views/layout.ejs' });
application.use('/static', express.static('static'));
require('./app/routes/index');

application.use(function (req, res, next) {
    application.locals.route = req.url;
    next();
});

application.use(bodyParser.urlencoded({ extended: true }));
application.use(bodyParser.json());
application.use(router, api);

const dbPromise = sqlite.open('./database.sqlite', Promise );

application.set('views','./application/views');
application.set('view options', { layout:'./application/views/layout.ejs' });
application.set('view engine', 'ejs');
application.engine('ejs', engine);
application.use(express.static(__dirname + '/static'));

module.exports = {application, dbPromise};

