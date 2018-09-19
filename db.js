const sqlite = require('sqlite');
const Promise = require('bluebird');

const dbPromise = sqlite.open('./database.sqlite', { Promise } );

module.exports = {dbPromise};