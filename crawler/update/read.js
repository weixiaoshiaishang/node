var request = require('request');
var cheerio = require('cheerio');
var util = require('util');
var debug = require('debug')('crawler:read');

exports.classList = function(url,callback){
    debug('读取分类信息:%s',url);
    request(url,function(err,res){
        if(err)
          return callback(err);
        var $ = cheerio.load(res.body.toString());
        var classList = [];
        $('.panel_body li a').each(function(){
            var $this = $(this);
            var item = {
                name:$this.text().trim(),
                url:$this.attr('href')
            };
            var s = item.url.match(/\/article\/category\/(\d+)/);
            if(Array.isArray(s)){
                item.id = s[1];
                classList.push(item);
            }
        });
        callback(err,classList);
    });
}
//http://blog.csdn.net/hongqishi/article/category/1075271
exports.classArticles = function(url,callback){
    debug('读取分章列表:%s',url);
    request(url,function(err,res){
        if(err)
            return callback(err);
        var $ = cheerio.load(res.body.toString());
        var articleList = [];
        $('#article_list .article_item').each(function(){
            var $this = $(this);
            var $title = $this.find('.link_title a');
            var $time = $this.find('.article_manage span');
            console.log("$time"+$time.text());
            var item = {
                title:$title.text().trim(),
                url:"http://blog.csdn.net/"+$title.attr('href'),
                time:$time.text().trim()
            }
            var s = item.url.match(/\/article\/details\/(\d+)/);
            if(Array.isArray(s)){
                item.id = s[1];
                articleList.push(item);
            }
        });
        callback(err,articleList);
    });
}

exports.articleDetail = function(url,callback){
    debug('读取文章的详情:%s',url);
    request(url,function(err,res){
        if(err)
            return callback(err);
        var $ = cheerio.load(res.body.toString());
        var tags = [];
        $('.tag2box a').each(function(){
            var tag = $(this).text().trim();
            if(tag)
                tags.push(tag);
        });
        var content = $('.article_content').html().trim();
        callback(err,{tags:tags,content:content});
    });
}
