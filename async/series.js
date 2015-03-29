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
async.series([
    function(callback){
        setTimeout(function(){
            callback(null,'watch over');
        },3000);
    },
    function(callback){
        setTimeout(function(){
            callback(null,"homework is done");
        },2000);

    }
],function(err,results){
    console.timeEnd('cost');
    console.log(results);
})