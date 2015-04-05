var io = require('socket.io')(80);
io.on('connection',function(socket){
    console.log('connected');
});