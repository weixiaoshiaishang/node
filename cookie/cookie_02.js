/**
 * 1.cookie是什么，干什么用。
 * 2.如何读写cookie
 * 3.cookie优缺点。
 */
/**
 * 如何写cookie
 * Set-Cookie: name=zfpx;path=/p;domain=.zfpx.com
 * expires=xxxxxx
 *
 **/

var url = require('url');
var http = require('http');
var cookieUtils = require('./cookieUtils2');
http.createServer(function(req,res){
    var urlObj = url.parse(req.url);
    if('/favicon.ico' == urlObj.pathname){
        res.writeHead(404);
        res.end(http.STATUS_CODES[404]);
    }else if("/write" == urlObj.pathname){
        res.writeHead(200,{
            "Content-Type":"text-html;charset=utf-8",
            /*"Set-Cookie":cookieUtils.toArray({name:"珠峰",age:6},{
                //path:"/path2",
               maxAge:'3',//秒
                //domain:'localhost',
                expires:new Date(new Date().getTime()+30*1000)//,
                //httpOnly:false
            })*/
            "Set-Cookie":cookieUtils.toArray([{name:"珠峰培训",age:6},{path:"/read1"}],[{name:"jeason",age:18,sex:"male"},{path:"/read2"}])
        })
        res.end('OK');
    }else{
        var cookie = req.headers.cookie;
        res.writeHead(200,{"Content-Type":"text-html;charset=utf-8"});
        res.end(JSON.stringify(cookieUtils.parse(cookie)));

    }
}).listen(80);
