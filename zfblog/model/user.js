var mongoose = require('../db');
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




module.exports = User;