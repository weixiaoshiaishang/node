var express = require('express');
var router = express.Router();
var Article = require('../model/Article');
var DateUtil = require('../util/DateUtil');
var settings = require('../settings');
router.get('/list/:pageNum/:pageSize', function(req, res, next) {
  var pageNum = req.params.pageNum && req.params.pageNum>0?parseInt(req.params.pageNum):1;
  var pageSize = req.params.pageSize &&req.params.pageSize>0?parseInt(req.params.pageSize):settings.pagesize;
  console.log(typeof pageSize);
  Article.pageQuery({},{pageNum:pageNum,pageSize:pageSize},function(err,count,articles){
      if(err)
        next(err);
       else{
         var totalPage = Math.ceil(count/pageSize);
         res.render('index',{
           title:"主页",
           pageNum:pageNum,
           pageSize:pageSize,
           totalPage:totalPage,
           articles:articles
         });
       }
  });
});

router.get('/add', function(req, res, next) {
  res.render('article/add',{
    title:"发表文章",
    cmd:'add',
    article:{}
  });
});

router.post('/add', function(req, res, next) {
 var user = req.session.user;
 var ts = DateUtil.getTime();
 var newArticle = new  Article({
  userId:user._id,
   title:req.body.title,
   content:req.body.content,
   createTime:ts,
   updateTime:ts
 })
  newArticle.save(function(err){
    if(err){
      req.flash('error',err);
      return res.redirect('back');
    }
    req.flash('success',"发表文章成功");
    res.redirect('/');
  });
});


module.exports = router;
