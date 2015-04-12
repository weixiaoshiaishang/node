var async = require('async');
/*async.series([
    function(done){
        setTimeout(function(){
            console.log(1);
            //throw Error('error');
            done();
        },1000);
    },
    function(done){
        console.log(2);
        done();
    }
],function(err){
    if(err)
    console.error(err);
    console.log('well done');
});*/

var arr = [1,2,3,4,5];
arr.forEach(function(item){
    setTimeout(function(){
        console.log(item);
    },(5-item)*1000);
});

async.each(arr,function(item,done){
    setTimeout(function(){
        console.log(item);
        done();
    },Math.random()*1000);
},function(err){
    if(err)console.error(err);
    console.log('over');
});