var fs = require('fs');
var path = require('path');

function deep(dir){
    console.log(dir);
    var stat = fs.statSync(dir);
    if(stat.isDirectory()){
        var files = fs.readdirSync(dir);
        for(var i=0;i<files.length;i++){
            deep(path.join(dir,files[i]));
        }
    }
}

function wide(dir){
    var stat = fs.statSync(dir);
    if(stat.isDirectory()){
        var files = [[dir,fs.readdirSync(dir)]];
        var fileArray = [];
        while(files.length>0){
            for(var i=0;i<files.length;i++){
                var parentDir = files[i][0];
                console.log(parentDir);
                for(var j=0;j<files[i][1].length;j++){
                    if(fs.statSync(path.join(parentDir,files[i][1][j])).isDirectory()){
                        var currentDir = path.join(parentDir,files[i][1][j]);
                        var tempFiles = fs.readdirSync(currentDir);
                        fileArray.push([currentDir,tempFiles]);
                    }
                }
            }
            files =fileArray;
            fileArray = [];
        }

    }
}


wide(path.resolve('a'));
//console.log(path.resolve('a'));
//var files = fs.readdirSync(path.resolve('a'));
//console.log(typeof files[0]);
