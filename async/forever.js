var async = require('async');

async.forever(function(next){
    console.log('running');
    setInterval(function(){
        next();
    },2000);

    setTimeout(function(){
        throw new Error('error');
    },5000)
},function(err){
    console.log(err);
})