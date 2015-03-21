var express = require('express');
var basicAuth = require('basic-auth');
var util = require('util');
var cookieParser = require('cookie-parser');
var app = express();
app.use(cookieParser());
/*app.use(function(req,res,next){
    function auth(res){
        res.set('WWW-Authenticate','Basic realm=Authorization Required');
        return res.send(401);
    }
    var user = basicAuth(req);
    if(user && (user.name1 =='zf' && user.pass == 'px')){
        next();
    }else{
        auth(res);
    }
    console.log(user);
    next();
});*/
app.get('/',function(req,res){
    console.log(req.headers.cookie);
    console.log(req.cookies);
   res.writeHead(200,{'Content-Type':'text/html'});
    res.write('<head><meta charset="utf-8"></head>');
    res.end('welcome');
})
app.get('/write',function(req,res){

    res.writeHead(200,{'Content-Type':'text/html',
    "Set-Cookie":"name=zf"});
    res.write('<head><meta charset="utf-8"></head>');
    res.end('welcome');
})
app.listen(8080);