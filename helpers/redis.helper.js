/**
 * Contains helper methods for redis
 */
const redisClient = require('redis').createClient;
const redis = redisClient(6379, 'localhost');

module.exports = {
        getCacheData : function(key, cb){
            redis.get(key, function (err, reply) {
                if (err) return console.error(err);
                cb(reply);
            });
        },

        setCacheData : function(key, value, cb){
            redis.set(key, value, function (err, reply) {
                if (err) return console.error(err);
                cb();
            });
        },

        updateCacheDate : function(key, value, cb){
            //need to write this functionality
        }
};
