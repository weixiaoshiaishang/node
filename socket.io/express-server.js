var express = require('express');
var app = express();
var util = require('util');
app.use(express.static(__dirname));
app.get('/',function(req,res){
    res.status(200).send('welcome to zfpx');
});
var server = require('http').createServer(app);
var io = require('socket.io')(server);
io.on('connection',function(socket){
    //socket.send('welcome to server');
    socket.emit('message','welcome to server');
    socket.on('hello',function(data){
        console.log(util.inspect(data));
        socket.emit('hello','confirm:'+data);
    })
});
server.listen(8080);


//socket.join('node.js') socket.leave('node.js')进出房间
//socket.broadcast.emit('DATA','msg');对房间内其它人说话， 不包括说话人本身
//socket.broadcast.to('node.js').emit('DATA','msg')对其它房间的人说话
//io.sockets.in('node.js').emit('DATA','msg');对房间内所有的人说话
//io.sockets.emit('DATA','msg');//对全世界人说话

