var request = require('request');
var util = require('util');
var async = require('async');
var read = require('./read');
var save = require('./save');
var debug = require('debug')('crawler:all');
var url = 'http://blog.csdn.net/hongqishi';

var classList;
var classArticles = {};
var articleList = [];
async.series([
   function(done){
       read.classList(url,function(err,list){
           classList = list;
           done(err);
       });
    },
    function(done){
        save.classList(classList,done)
    },
    function(done){
        async.eachSeries(classList,function(cls,next){
            read.classArticles(cls.url,function(err,list){
                classArticles[cls.id] = list;
                next(err);
            })
        },done)
    },function(done){
        async.eachSeries(Object.keys(classArticles),function(classid,next){
            save.classArticles(classid,classArticles[classid],next);
        },done)
    },
    function(done){
        debug('去除重复的文章');
        var articles = {};
        Object.keys(classArticles).forEach(function(classId){
            classArticles[classId].forEach(function(item){
                articles[item.id] = item;
            });
        });
        Object.keys(articles).forEach(function(id){
            articleList.push(articles[id]);
        })
        done();
    },
    function(done){
        console.log("articleList:"+articleList.length);
        async.eachSeries(articleList,function(item,next){
            read.articleDetail(item.url,function(err,ret){
                save.articleDetail(item.id,item.title,ret.tags,ret.content,function(){
                    next();
                })
            })
        },done)
    }
]);