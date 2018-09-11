const kue = require('kue'),
    queue = kue.createQueue({
        root: __dirname,
        redis: {
            host: 'redis',
            port: 6379
        }
    });

queue.on('error', err => {
    console.log('QUEUE ERROR: ', err);
});
