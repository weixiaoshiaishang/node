var request = require('request');
var util = require('util');
var mysql = require('mysql');
var async = require('async');
var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'zfpx',
    database:'test'
});
connection.connect();
var debug = require('debug')('crawler:save');
exports.classList = function(list,callback){
    debug('保存文章分类列表');
    async.eachSeries(list,function(item,next){
        connection.query('insert into class_list(id,name,url) values(?,?,?)',[item.id,item.name,item.url],next);
    },callback);
}
exports.classArticles = function(class_id,list,callback){
    debug('保存文章列表到数据库;%d',class_id);
    async.eachSeries(list,function(item,next){
        connection.query('insert into article_list(id,title,url,postdate,class_id) values(?,?,?,?,?)',[item.id,item.title,item.url,item.time,class_id],next);
    },callback);
}

exports.articleDetail = function(id,title,tags,content,callback){
    debug('保存文章的详情:%d',id);
    connection.query('insert into article_detail(id,title,tags,content) values(?,?,?,?)',[id,title,tags,content],callback);
}