var http = require('http');
var util = require('util');
var url = require('url');
var fs = require('fs');
var onReqeust = function(req,res){
    var urlObj = url.parse(req.url,true);
    //console.log(util.inspect(urlObj));
    var pathname = urlObj.pathname;
    var query = urlObj.query;
    //res.writeHead(200,{"Content-Type":"text/html;charset=utf-8",
     //   "Access-Control-Allow-origin":"http://localhost:633"});
    if(pathname == "/"){
        res.statusCode =  404;
        res.setHeader("Content-Type","text/html");
        res.sendDate = false;
        res.removeHeader("Content-Type")
        console.log("header value"+res.getHeader("Content-Type"));
       fs.createReadStream('./index.html').pipe(res);
    }else if(pathname == '/post'){

        req.on('data',function(data){
            res.write(data);
        });
        req.on('end',function(){
            res.end(util.inspect(query));
        })


    }
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
