var mongoose = require('../db'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var util = require('util');
var ArticleSchema = new Schema({
    title:String,
    content:String,
    userId:{type:ObjectId,ref:'User'},
    createTime:Object,
    updateTime:Object
});

var articleModel = mongoose.model('Article',ArticleSchema);
function Article(article){
    this.title = article.title,
    this.content = article.content,
    this.userId = article.userId,
    this.createTime = article.createTime,
    this.updateTime = article.updateTime
}

Article.prototype.save = function(callback){
    var newArticle = new articleModel({
        title:this.title,
        content:this.content,
        userId:this.userId,
        createTime:this.createTime,
        updateTime:this.updateTime
    });

    newArticle.save(function(err,article){
        if(err)
            callback(err);
        else
            callback(null,article);
    })
}

Article.pageQuery = function(query,pageInfo,callback){
    articleModel.count(query,function(err,count){
        articleModel.find(query).sort({createTime:1})
            .skip((pageInfo.pageNum-1)*pageInfo.pageSize)
            .limit(pageInfo.pageSize).populate('userId')
            .exec(function(err,articles){
            if(err)
                callback(err);
            else{
                console.log(articles.length);
                callback(err,count,articles);
            }
        })
    })
}
module.exports= Article;