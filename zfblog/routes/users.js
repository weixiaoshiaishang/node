var express = require('express');
var router = express.Router();


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

  res.redirect('/');
});

module.exports = router;
