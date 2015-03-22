var mongoose = require('../db');
var crypto = require('crypto');
//声明userSchema,用来定义collection的名字和里面文档的存储结构
var userSchema = new mongoose.Schema({
    username:String,
    password:String,
    email:String,
    avatar:String
},{collection:'user'});

//定义模型，它用来执行与数据库的操作
var userModel = mongoose.model('User',userSchema);

function User(user){
    this.username = user.username;
    this.password = user.password;
    this.email = user.email;
}

User.prototype.save = function(callback){
    var md5 = crypto.createHash('md5'),
    emailMd5 = md5.update(this.email.toLowerCase()).digest('hex'),
    avatar = "https://secure.gravatar.com/avatar/"+emailMd5+"?s=48";

    var newUser = new userModel({
        username:this.username,
        password:this.password,
        email:this.email,
        avatar:avatar
    });

    newUser.save(function(err,user){
        if(err)
            callback(err);
        else
            callback(null,user);
    });
}

User.get = function(username,callback){
    userModel.findOne({username:username},function(err,user){
        if(err)
            return callback(err);
        else{
            callback(null,user);
        }
    });
}


module.exports = User;