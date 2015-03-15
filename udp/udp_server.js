/**
 * 创建服务器
 * createSocket
 * var socket = dgram.createSocket(type,callback(msg,rinfo));
 * message
 */
//socket.bind(port,[address],[callback]);
//socket.send(buf,offset,length,port,address,callback(err,bytes))
var dgram = require('dgram');
var util = require('util');
global._____u___t__i__l = util;
var server = dgram.createSocket('udp4',function(msg,rinfo){
    console.log(util.inspect(rinfo));
    console.log("received "+msg);
    var buf = new Buffer("服务器收到:"+msg);
    server.send(buf,0,buf.length,rinfo.port,rinfo.address);
})
_____u___t__i__l.inspect('dd');
server.bind(40000,'localhost');


