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
    console.log(dir);
    var stat = fs.statSync(dir);
    if(stat.isDirectory()){
        var files = fs.readdirSync(dir);
        var fileArray = [];
        while(files.length>0){
            for(var i=0;i<files.length;i++){
                console.log(files[i]);
                if(fs.statSync(path.join(dir,files[i])).isDirectory()){
                    fileArray.push(fs.readdirSync(path.join(dir,files[i])));
                }
            }
            files =fileArray;
        }

    }
}


//wide(path.resolve('a'));
//console.log(path.resolve('a'));
var files = fs.readdirSync(path.resolve('a'));
console.log(typeof files[0]);
