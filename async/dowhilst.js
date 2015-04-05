var async = require('async');

var count =0;
console.time('cost');
async.doWhilst(function(callback){
    setTimeout(function(){
        count ++;
        callback();
    },1000)
},function(){
    return count<3;
},function(err){
    console.timeEnd('cost');
})