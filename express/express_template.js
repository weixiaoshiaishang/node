/**
 * 模板
 * 1.安装express
 * 2.
 */
var express = require('express');
var app = express();
var util = require('util');
var path = require('path');
var bodyParser = require('body-parser');
var multer = require('multer');
var session = require('express-session');
//var session = require('cookie-session');
var fs = require('fs');
app.set('view engine','html');
app.set('views',__dirname);
app.engine('.html',require('ejs').__express);
app.use(session({
    secret:'zfpx'
}));

app.use(multer());
app.use(function(req,res,next){
    if(req.url == "/login" || req.session.username){
        next();
    }else{
        res.redirect('/login');
    }
})
app.get('/login',function(req,res){
   res.render('index');
});
app.post('/login',function(req,res){
    req.session.username = req.body.username;
    res.redirect('/home');
});
app.get('/logout',function(req,res){
    req.session.username = null;
    res.redirect('/login');
});

app.get('/home',function(req,res){
    res.render('home',{
        username:req.session.username
    });
});




app.listen(3000);