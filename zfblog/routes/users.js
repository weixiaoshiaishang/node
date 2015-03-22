var express = require('express');
var User = require('../model/User');
var router = express.Router();
var crypto = require('crypto');

router.get('/reg', function(req, res, next) {
  res.render('user/reg');
});

router.post('/reg', function(req, res, next) {
  var username = req.body.username,
      email = req.body.email,
      password = req.body.password,
      password_repeat = req.body['password_repeat'];
  if(!username){
    req.flash('error','用户名不能为空');
    return res.redirect('back');
  }
   if(!password || password !=password_repeat ){
       req.flash('error','两次输入的密码不一致，请重新输入');
       return res.redirect('back');
   }
  var md5 = crypto.createHash('md5');
  password = md5.update(password).digest('hex');
  var newUser = new User({
      username:username,
      password:password,
      email:req.body.email
  });
  User.get(username,function(err,user){
      if(err){
          req.flash('error','查询出错');
          return res.redirect('back');
      }else{
          if(user){
              req.flash('error','用户名存在，请重新输入');
              return res.redirect('back');
          }else{
              newUser.save(function(err,user){
                  if(err){
                      req.flash('error','注册失败');
                      return res.redirect('back');
                  }else{
                      req.session.user = user;
                      req.flash('success','注册成功,欢迎'+user.username+'光临');
                      res.redirect('/');
                  }

              })
          }
      }
  });

});

router.get('/login', function(req, res, next) {
    res.render('user/login');
});

router.get('/logout', function(req, res, next) {
    req.session.user = null;
    req.flash('success','退出成功');
    res.redirect('/');
});

router.post('/login', function(req, res, next) {
    var password = crypto.createHash('md5').update(req.body.password).digest('hex');
    User.get(req.body.username,function(err,user){
        if(err){
            req.flash('error','查询出错');
            return res.redirect('back');
        }else {
            if(user){
                if(user.password != password){
                    req.flash('error','密码错误,请重新输入');
                    return res.redirect('back');
                }else{
                    req.session.user = user;
                    req.flash('success','注册成功,欢迎'+user.username+'光临');
                    res.redirect('/');
                }
            }else{
                console.log('====');
                req.flash('error','用户名不存在,请重新输入');
                return res.redirect('back');
            }
        }
    });
})
module.exports = router;
