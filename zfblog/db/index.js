var mongoose = require('mongoose');
mongoose.connect("mongodb://123.57.143.189:27017/blog");
module.exports = mongoose;