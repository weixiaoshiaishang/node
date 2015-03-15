var http = require('http');
var util = require('util');
var url = require('url');
var fs = require('fs');
var mime = require('mime');
var onReqeust = function(req,res){

      // res.writeHead(200,{"Content-Type":mime.lookup('./gigi.jpg')})
    //res.end(fs.readFileSync('./gigi.jpg'));
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

/*
app.setTimeout(3000,function(socket){
    console.log('服务器超时');
});*/
