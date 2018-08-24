const MongoClient = require('mongodb').MongoClient;

const {app} = require('./app');

const port = process.env.PORT || 3000;
const server  = require('http').createServer(app);
const url = 'mongodb://localhost:27017';
const mongoDB = 'notes';

module.exports = MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
    if (err) {
        throw err;
    }
    const db = client.db(mongoDB);

    server.listen(port, function () {
        console.log('App listening on port 3000!');
    });
});

// module.exports = server.listen(port, function () {
//     console.log('App listening on port 3000!');
// });
