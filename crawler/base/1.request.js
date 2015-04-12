var request = require('request');
var fs = require('fs');
request('http://www.baidu.com',function(err,response,body){
    if(err)
        console.error(err);
    console.log(body);
})

request('https://www.baidu.com/img/bdlogo.png').pipe(fs.createWriteStream('bdlogo.png'));