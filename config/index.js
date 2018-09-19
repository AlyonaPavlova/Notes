const config = {};

config.redisStore = {
    url: process.env.REDIS_STORE_URI,
    host: process.env.REDIS_HOST || '127.0.0.1',
    secret: process.env.REDIS_STORE_SECRET
};

module.exports = config;