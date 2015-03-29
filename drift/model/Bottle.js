var redis = require('redis');
var uuid = require('uuid');
var pool = require('generic-pool').Pool({
    name:'redisPool',
    create:function(callback){
        callback(null,redis.createClient());
    },
    destroy:function(client){
        client.quit();
    },
    max:100,
    min:5,
    idleTimeoutMills:30*1000,
    log:false
});

module.exports.throw = function(bottle,callback){
    var bottleId = uuid.v4();
    var expTime = 3600*24;
    pool.acquire(function(err,client){
      client.HMSET(bottleId,bottle,function(err,result){
        if(err)
            callback({code:0,msg:"请一会再试"});
        client.EXPIRE(bottle,expTime,function(){
            pool.release(client);
            return callback({code:1,msg:"瓶子已经飘向远方了"});
        });

      });
    });
}

module.exports.pick = function(callback){
    pool.acquire(function(err,client){
        client.RANDOMKEY(function(err,bottleId){
            if(!bottleId){
                return callback({code:0,msg:"大海空空如也"});
            }
            client.HGETALL(bottleId,function(err,bottle){
                client.DEL(bottleId,function(){
                    pool.release(client);
                    return callback({code:1,msg:bottle});
                })

            });
        });
    });
}