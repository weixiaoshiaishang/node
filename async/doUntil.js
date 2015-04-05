/**
 *
 */

var async = require('async');

console.time('cost');
var list = [{name:'zhangsan',age:5},{name:'lisi',age:6}];
var count =5;
async.doUntil(
    function(callback){
        setTimeout(function(){
          count --;
            callback();
        },1000)
    },function(){
        return count <0;
    },function(err){
       console.timeEnd('cost');
    }
)