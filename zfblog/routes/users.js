var express = require('express');
var router = express.Router();


router.get('/reg', function(req, res, next) {
  res.render('user/reg',{
    title:"欢迎注册",
    er:req.flash('error').toString()
  });
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
  res.redirect('/');
});

module.exports = router;
