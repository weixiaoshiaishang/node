var mongoose = require('../db'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
var util = require('util');
var markdown = require('markdown').markdown;

var CommentSchema = new Schema({
    userId:{type:ObjectId,ref:'User'},
    content:String
});

var ArticleSchema = new Schema({
    title:String,
    content:String,
    userId:{type:ObjectId,ref:'User'},
    createTime:Object,
    updateTime:Object,
    pv:Number,
    tags:[String],
    comments:[CommentSchema]
});

var articleModel = mongoose.model('Article',ArticleSchema);
function Article(article){
    this.title = article.title,
    this.content = article.content,
    this.userId = article.userId,
    this.tags = article.tags,
    this.createTime = article.createTime,
    this.updateTime = article.updateTime
}
Article.prototype.update = function(_id,callback){
    articleModel.update({_id:_id},{$set:{content:this.content,updateTime:this.updateTime}},function(err,article){
        if(err)
            return callback(err);
        else
            return callback(null,article);
    });
}

Article.prototype.save = function(callback){
    var newArticle = new articleModel({
        title:this.title,
        content:this.content,
        userId:this.userId,
        tags:this.tags,
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
Article.getTagArticles = function(tag,callback){
    var query = {tags:tag}
    articleModel.count(query,function(err,count){
     articleModel.find(query).sort({'createTime.minute':-1}).populate('userId')
            .exec(function(err,articles){
                if(err)
                    callback(err);
                else{
                    callback(err,count,articles);
                }
            })
    })
}
Article.pageQuery = function(query,pageInfo,callback){
    articleModel.count(query,function(err,count){
        var queryCursor = articleModel.find(query).sort({'createTime.minute':-1});
        if(pageInfo && pageInfo.pageNum){
            queryCursor = queryCursor.skip((pageInfo.pageNum-1)*pageInfo.pageSize)
                .limit(pageInfo.pageSize);
        }
        queryCursor.populate('userId')
            .exec(function(err,articles){
            if(err)
                callback(err);
            else{
                callback(err,count,articles);
            }
        })
    })
}

Article.findById= function(_id,callback){
    articleModel.findOne({_id:_id}).populate('userId').populate('comments.userId').exec(function(err,article){
        if(err)
          callback(err);
        else{
            article.content = markdown.toHTML(article.content);
            articleModel.update({_id:_id},{$inc:{"pv":1}},function(err){
                callback(err,article);
            });
        }
    });
}
Article.deleteById = function(_id,callback){
    articleModel.remove({_id:_id},function(err){
        callback(err);
    });
}
Article.addComment = function(_id,userId,content,callback){
    articleModel.update({_id:_id},{$push:{comments:{userId:userId,content:content}}},function(err,ret){
        if(err)
             callback(err);
        else
            callback(null,ret);
    })
}
Article.getTags = function(callback){
    articleModel.distinct('tags',function(err,tags){
        callback(err,tags);
    });
}
module.exports= Article;