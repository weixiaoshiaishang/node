var express = require('express');
var router = express.Router();
var Article = require('../model/Article');
var DateUtil = require('../util/DateUtil');
var settings = require('../settings');
var formidable = require('formidable');
var uuid = require('uuid'),
    path= require('path'),
    fs = require('fs');
router.get('/list/:pageNum/:pageSize', function(req, res, next) {
  var pageNum = req.params.pageNum && req.params.pageNum>0?parseInt(req.params.pageNum):1;
  var pageSize = req.params.pageSize &&req.params.pageSize>0?parseInt(req.params.pageSize):settings.pagesize;
  var query = {};
  var searchBtn = req.query.searchBtn;
  if(searchBtn){
      req.session.keyword = req.query.keyword;
  }

  if(req.session.keyword){
      var pattern = new RegExp(req.session.keyword,"i");
      query['title'] =pattern;
  }
  Article.pageQuery(query,{pageNum:pageNum,pageSize:pageSize},function(err,count,articles){
      if(err)
        next(err);
       else{
         var totalPage = Math.ceil(count/pageSize);
        console.log(pageNum+" "+pageSize+" "+totalPage);
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

router.get('/u/:userId',function(req,res,next){
  Article.pageQuery({userId:req.params.userId},{},function(err,count,articles){
    if(err)
      next(err);
    else{
      res.render('index',{
        title:"主页",
        count:count,
        articles:articles
      });
    }
  });
})
router.get('/tags/:tag',function(req,res,next){
    Article.getTagArticles(req.params.tag,function(err,count,articles){
        if(err)
            next(err);
        else{
            res.render('index',{
                title:"主页",
                count:count,
                articles:articles
            });
        }
    });
})
router.get('/add', function(req, res, next) {
  res.render('article/add',{
    title:"发表文章",
    cmd:'add',
    article:{}
  });
});

router.get('/view/:articleId', function(req, res, next) {
  Article.findById(req.params.articleId,function(err,article){
    res.render('article/view',{
      title:"文章详情",
      article:article
    });
  });
});

router.get('/edit/:articleId', function(req, res, next) {
  Article.findById(req.params.articleId,function(err,article){
    res.render('article/add',{
      title:"发表文章",
      cmd:'edit',
      article:article
    });
  });
});


router.get('/delete/:articleId', function(req, res, next) {
  Article.deleteById(req.params.articleId,function(err,article){
    if(err){
      req.flash('error',err);
      return res.redirect('back');
    }
    req.flash('success',"删除文章成功");
    res.redirect('/');
  });
});

router.post('/add', function(req, res, next) {
 var user = req.session.user;
 var ts = DateUtil.getTime();
 var tags = [req.body.tag1,req.body.tag2,req.body.tag3];
 var newArticle = new  Article({
  userId:user._id,
   title:req.body.title,
   content:req.body.content,
   tags:tags,
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

router.post('/edit', function(req, res, next) {
  var newArticle = new Article({
    content:req.body.content,
    updateTime:DateUtil.getTime()
  });
  newArticle.update(req.body._id,function(err){
    if(err){
      req.flash('error',err);
      return res.redirect('back');
    }
    req.flash('success',"更新文章成功");
    res.redirect('/article/view/'+req.body._id);
  });
});

router.get('/upload',function(req,res,next){
    res.render('article/upload',{
        title:'上传文件'
    });
});

router.post('/upload',function(req,res){
  new formidable.IncomingForm().parse(req,function(err,fields,files){
      var filename = uuid.v4()+path.extname(files.uploadFile.name);
      fs.createReadStream(files.uploadFile.path).pipe(fs.createWriteStream('../public/upload'+filename));
      console.log(files);
      res.end(filename);
  })
});
router.post('/addComment',function(req,res){
    Article.addComment(req.body._id,req.body.userId,req.body.content,function(err){
        if(err){
            req.flash('error',err);
            return res.redirect('back');
        }
        req.flash('success',"评论成功");
        res.redirect('/article/view/'+req.body._id);
    });
});
router.get('/tags',function(req,res,next){
    Article.getTags(function(err,tags){
        if(err)
            next(err);
        else{
            res.render('article/tags',{
                title:"标签页",
                tags:tags
            });
        }
    });
})
module.exports = router;
