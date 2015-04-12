var fs = require('fs');
try{
 setTimeout(function(){
     fs.open('ff');
 },300);
}catch(err){
    console.error(err);
}
console.log('over');
setInterval(function(){
    console.log('on.....');
},1000);
/*
process.on('uncaughtException',function(err){
    console.error(err);
});*/
