var express = require('express');
var User = require('../model/User');
var router = express.Router();
var crypto = require('crypto');

router.get('/reg', function(req, res, next) {
  res.render('user/reg',res.locals);
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
  newUser.save(function(err,user){
      if(err){
          req.flash('error','注册失败');
          return res.redirect('back');
      }else{
          req.session.user = user;
          req.flash('success','注册成功');
          res.redirect('/');
      }

  })
});

module.exports = router;
