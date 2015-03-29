var express = require('express');
var router = express.Router();
var Bottle = require('../model/Bottle');
/**
 * 扔一个瓶子
 * owner content time
 */
router.post('/throw', function(req, res, next) {
    var bottle = {};
    if(req.body.content){
        bottle.content = req.body.content;
    }else{
        return res.json({code:0,msg:"内容不能为空!"});
    }
    bottle.username = req.session.user.username;
    bottle.time = Date.now();
    Bottle.throw(bottle,function(result){
        return res.json(result);
    });
});


router.post('/pick', function(req, res, next) {
    Bottle.pick(function(result){
        return res.json(result);
    });
});
module.exports = router;
