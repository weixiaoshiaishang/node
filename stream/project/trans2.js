var fs = require('fs');
var path = require('path');
function wide(dir) {
    var files = [dir];
    while(files.length != 0) {
        var length = files.length;
        for(var i = 0; i< length; i++) {
            console.log(files[i]);
            if(fs.statSync(files[i]).isDirectory()) {
                var subFiles = fs.readdirSync(files[i]);
                subFiles.forEach(function(value, index) {
                    subFiles[index] = path.join(files[i], subFiles[index]);
                });
                files = files.concat(subFiles);
            }
        }
        files.splice(0, length);

    }
}

wide(path.resolve('a'));
//console.log(path.resolve('a'));
//var files = fs.readdirSync(path.resolve('a'));
//console.log(typeof files[0]);
