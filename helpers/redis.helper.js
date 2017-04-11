/**
 * Contains helper methods for redis
 */
const redisClient = require('redis').createClient;
const redis = redisClient(6379, 'localhost');

module.exports = {
    getCacheData: function (key, cb) {
        redis.get(key, function (err, reply) {
            if (err) return console.error(err);
            cb(reply);
        });
    },

    setCacheData: function (key, value, cb) {
        redis.set(key, value, function (err, reply) {
            if (err) return console.error(err);
            cb();
        });
    },

    getCacheDatabyPattern: function (key, cb) {
        let replyArr = [];

        redis.keys(key + '*', function (err, keys) {
            if (err) return console.error(err);
            let len = keys.length;
            if (len == 0) {
                cb();
            }

            for (let i = 0; i < len; i++) {
                redis.get(keys[i], function (err, reply) {
                    if (err) return console.error(err);
                    else {
                        replyArr.push(JSON.parse(reply));
                        if (i == len - 1) {
                            cb(replyArr);
                        }
                    }
                });
            }
        });
    },

    setCacheDatabyPattern: function (key, value, cb) {
        for (let i = 0, len = value.length; i < len; i++) {
            redis.set(key + '_' + value[i]._id.toString(), JSON.stringify(value[i]), function (err, reply) {
                if (err) return console.error(err);
            });
        };
        cb();
    }
};
