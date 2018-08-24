const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'notes';

MongoClient.connect(url, function (err, client) {
    if (err) {
        throw err;
    }
    console.log("Connected successfully to server");

    const db = client.db(dbName);

    client.close();
});