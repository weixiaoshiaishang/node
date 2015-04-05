var async = require('async');
//我现在要蒸馒头
async.auto({
    getWater:function(callback){
        callback(null,'Water');
    },
    getFlour:function(callback){
        callback(null,'Flour');
    },
    mixFlour:['getWater','getFlour',function(callback,results){
        callback(null,results['getWater']+'|'+results['getFlour']+'|mixFlour');
    }],
    steam:['mixFlour',function(callback,results){
        callback(null,results['mixFlour']+'|steam');
    }]
},function(err,results){
    console.log(results['steam']);
})