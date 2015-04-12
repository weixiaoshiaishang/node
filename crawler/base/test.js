var fs = require('fs');
var out = fs.createWriteStream('./test.txt');
var count = 0;
setInterval(function(){
    out.write(count++);
},1000);