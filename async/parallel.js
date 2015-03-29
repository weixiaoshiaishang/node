/**
 *
 */

var async = require('async');


console.time('cost');
async.parallelLimit([
    function(callback){
        setTimeout(function(){
            callback(null,'+水');
        },2000);
    },
    function(callback){
        setTimeout(function(){
            callback(null,"+咖啡");
        },2000);
    },
    function(callback){
        setTimeout(function(){
            callback(null,"+咖啡");
        },2000);
    },
    function(callback){
        setTimeout(function(){
            callback(null,"+咖啡");
        },2000);
    }
],2,function(err,results){
    console.timeEnd('cost');
    console.log(results);
})