/**
 * 中间件
 * 1.app.use([path],function(req,res,next))
 * 2.
 */
var express = require('express');
var app = express();
//泡一杯咖啡
app.use('/coffee/:person',function(req,res,next){
  res.coffee = "add water";
  next();
});

app.use('/coffee/:person',function(req,res,next){
    res.coffee += "add coffee";
    if(req.params['person']=='black'){
        res.end(res.coffee);
    }else{
        next();
    }

});

app.use('/coffee/:person',function(req,res,next){
    res.coffee += "add suger";
    next();
});

app.use('/coffee/:person',function(req,res,next){
    res.coffee += "add milk";
    next();
});

app.get('/coffee/:person',function(req,res){
    res.end(res.coffee);
});



app.listen(3000);