/**
 * 用户可以连接
 * 提示输入 用户名
 * 可以发言，发言之后可以广播
 * 加入和退出聊天室都进行广播
 **/

var net = require('net'),util = require('util');
var clients = {};

function broadcast(uname,msg){
    msg += "\r\n>";
    for(var client in clients){
        if(uname != client)
            clients[client].write(msg);
    }
}

function listen(socket){
    var uname;

    socket.write('欢迎光临,请输入用户\r\n>');
    socket.on('data',function(data){
        if(uname){
            broadcast(uname,uname+":"+data);
        }else{
            if(clients[data]){
                socket.write('用户已经被别人用了， 请大侠改个名吧\r\n>');
            }else{
                uname= data;
                clients[uname] = socket;
                broadcast(uname,uname+"已加入聊天");
                server.getConnections(function(err,count){
                    broadcast(uname,"现在有"+count+"个用户在聊天");
                });
            }
        }
    })
    socket.on('close',function(){
        broadcast(uname,uname+"已离开聊天");
        delete clients[uname];
        socket.destroy();
        server.getConnections(function(err,count){
            broadcast(uname,"现在有"+count+"个用户在聊天");
        });
    })
}
var server = net.createServer(listen);
server.listen(8080);