var http = require('http');
var util = require('util');
var onReqeust = function(req,res){
    console.log(req.method+req.url+req.httpVersion+util.inspect(req.headers),req.trailers);
    console.log('a new request');
    res.end('end');
};
var app = http.createServer(onReqeust).listen(8080,function(){
    console.log('started');
});

app.on('connection',function(socket){
    console.log('a new connection');
});

app.on('close',function(){
    console.log('close');
})

app.on('error',function(err){
    console.log(err);
})

app.setTimeout(3000,function(socket){
    console.log('服务器超时');
});