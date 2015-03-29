/**
 *
 */

var async = require('async');

console.time('cost');
var list = [{name:'zhangsan',age:5},{name:'lisi',age:6}];
var count =0;
async.whilst(function(){
        return count <list.length;
    },
    function(callback){
        setTimeout(function(){
            var user = list[count++];
            user.age = user.age +1;
            callback();
        },1000)
    },function(err){
        console.log(list);
    }
)