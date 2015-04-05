/**
 *
 */

var async = require('async');

console.time('cost');
var list = [{name:'zhangsan',age:5},{name:'lisi',age:6}];
var count =5;
async.until(function(){
        return count <0;
    },
    function(callback){
        setTimeout(function(){
          count --;
            callback();
        },1000)
    },function(err){
       console.timeEnd('cost');
    }
)