/**
 *
 */

var async = require('async');
/*
async.series({
    watchTv:function(callback){
        callback(null,'watch over');
    },
    writeHomeWork:function(callback){
        callback(null,"homework is done");
    }
},function(err,results){
    console.log(results);
})
*/

console.time('cost');
async.waterfall([
    function(callback){
        setTimeout(function(){
            callback(null,'+水');
        },3000);
    },
    function(data,callback){
        setTimeout(function(){
            callback(null,data+"+咖啡");
        },2000);
    }
],function(err,results){
    console.timeEnd('cost');
    console.log(results);
})