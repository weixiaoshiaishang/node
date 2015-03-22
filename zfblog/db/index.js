var mongoose = require('mongoose');
//mongoose.connect("mongodb://123.57.143.189:27017/blog");
mongoose.connect("mongodb://admin:admin@c942.candidate.16.mongolayer.com:10942,c920.candidate.35.mongolayer.com:10920/zfblog?replicaSet=set-550b93c6dd1957577d000456");
module.exports = mongoose;