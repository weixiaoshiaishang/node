var express = require('express');//导入
var path = require('path');//
var favicon = require('serve-favicon');//收藏图标中间件
var logger = require('morgan');//日志中间件
var cookieParser = require('cookie-parser');//解析cookie
var bodyParser = require('body-parser');//解析body的数据
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var routes = require('./routes/index');//首页
var users = require('./routes/users');//用户
var article = require('./routes/article');
var settings = require('./settings');
var forbidden = require('./middleware/forbidden');
var app = express();
app.use(session({
  secret:'zfblog',
  resave:false,
  saveUninitialized:false,
  store:new MongoStore({
    db:settings.mongoConfig.db,
    host:settings.mongoConfig.host,
    port:settings.mongoConfig.port
  })
}));
app.use(flash());
// 设置模板引擎和模板存放路径
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
//
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());//解析 cookie
app.use(express.static(path.join(__dirname, 'public')));//静态文件中间件
app.use(forbidden({mustLogin:['/users/logout'],mustNotLogin:['/users/reg','/users/login']}));
app.use(function(req,res,next){
  res.locals.error = req.flash('error').toString() || "";
  res.locals.success = req.flash('success').toString() || "";
  res.locals.title = "";
  res.locals.count = 0;
  res.locals.pageNum= 0;
  res.locals.pageSize= 0;
  res.locals.totalPage= 0;
  res.locals.keyword='';
  res.locals.user = req.session.user;
  next();
})
app.use('/', routes);

app.use('/users', users);

app.use('/article', article);

// catch 404 and forward to error handler
//捕获
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
