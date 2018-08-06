const app = require('./app');
const port = process.env.PORT || 3000;
const server  = require('http').createServer(app);

module.exports = server.listen(port, function () {
    console.log('App listening on port 3000!');
});