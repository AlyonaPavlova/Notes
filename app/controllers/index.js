const express = require('express');
const router = express.Router;

const pages = require(__dirname + '/app/controllers/pages');

router.get('/api/v1', function (req, res) {
    res.send('API is running');
});

router.get('/', function (req, res) { res.redirect('home');});
router.get('/home', pages.home);
router.get('/features', pages.features);
router.get('/news', pages.news);

module.exports = router;