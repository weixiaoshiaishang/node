/**
 * Created by sunjunjie on 15/3/24.
 */


function parse(str){
    var cookieObj = {}
    if(str){
        var vals = str.split("; ");
        for(var i=0;i<vals.length;i++){
            var kv = vals[i].split("=");
            cookieObj[kv[0]] = decodeURIComponent(kv[1]);
        }
    }
    return cookieObj;
}


function toArray(){  //[{name:"珠峰培训",age:6},{path:"/read1"}],[{name:"jeason",age:18,sex:"male"},{path:"/read2"}]
    var cookieArray =[];
    for(var i=0;i<arguments.length;i++){
        var cookies = arguments[i];
        var cookieStr = tostring(cookies);
        Array.prototype.push.apply(cookieArray, cookieStr);
    }
    console.log(cookieArray);
    return cookieArray;
}

function tostring(cookies){ //[{name:"珠峰培训",age:6},{path:"/read1"}]
    var cookieArr = [];
    var cookieObj = cookies[0];
    for(name in cookieObj) {
        var cookieStr = name + "=" + encodeURIComponent(cookieObj[name]);
        if (cookies[1]) {
            var options = cookies[1];
            if (options.path) {
                cookieStr += ";path=" + options.path;
            }
            if (options.maxAge) {
                var maxAge = parseInt(options.maxAge);
                if (isNaN(maxAge)) {
                    throw new Error("maxAge must be a number");
                } else {
                    cookieStr += ";max-age=" + maxAge;
                }
            }
            if (options.domain) {
                cookieStr += ";domain=" + options.domain;
            }
            if (options.expires) {
                if (options.expires instanceof  Date) {
                    cookieStr += ";expires=" + options.expires.toLocaleString();
                } else {
                    throw new Error("must be a date");
                }
            }
            if (options.httpOnly) {
                cookieStr += ";httpOnly";

            }
        }
        cookieArr.push(cookieStr);
    }
//    console.log("==="+cookieArr);
    return cookieArr;
}


module.exports.parse = parse;
module.exports.toArray = toArray;