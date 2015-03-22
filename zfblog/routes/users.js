var express = require('express');
var router = express.Router();


router.get('/reg', function(req, res, next) {
  res.render('user/reg',{
    title:"欢迎注册"
  });
});

router.post('/reg', function(req, res, next) {
  //res.send(req.body);
  res.redirect('/');
});

module.exports = router;
