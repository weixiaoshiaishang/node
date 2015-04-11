var express = require('express');
var crypto = require('crypto');
var app = express();
var port = 3000;

app.use(express.static(__dirname+'/static'));
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
var util = require('util');
app.use(session({
    secret:'zfpx',
    cookie:{maxAge:60*1000},
    resave:false,
    saveUninitialized:true
}));

app.get('/api/validate',function(req,res){
    var user = req.session.user;
    if(user){
        res.json({code:1,user:user});
    }else{
        res.json({code:0});
    }
});
app.get('/api/logout',function(req,res){
    req.session.user = null;
    res.json({code:1});
});
app.post('/api/login',function(req,res){
    var email = req.body.email;
    if(email){
        var md5 = crypto.createHash('md5'),
            emailMd5 = md5.update(email.toLowerCase()).digest('hex'),
            avatar = "https://secure.gravatar.com/avatar/"+emailMd5+"?s=48";
        var newUser = {email:email,avatar:avatar};
        req.session.user = newUser;
        res.json({code:1,user:newUser});
    }else{
        res.json({code:0});
    }
});

app.use(function(req,res){
    res.sendFile(__dirname+'/static/index.html');
});

var rooms = [];
//users[user.email] = user;
function getRoom(name){
    console.log(util.inspect(rooms));
    for(var i=0;i<rooms.length;i++){
        if(rooms[i].name == name){
            return rooms[i];
        }
    }
}
function addUser(room,user){
    if(room && room.users){
        var exists = false;
        for(var i=0;i<room.users.length;i++){
            if(room.users[i].email == user.email){
                exists = true;
                break;
            }
        }
        if(!exists)
            room.users.push(user);
    }
}

function deleteUser(room,email){
    if(room && room.users){
        for(var i=0;i<room.users.length;i++){
            if(room.users[i].email == email){
                room.users.splice(i,1);
                return;
            }
        }
    }
}var SYSTEM = {
    email:'SYSTEM',
    avatar:''
}
var io = require('socket.io').listen(app.listen(port));
io.sockets.on('connection',function(socket){
   var roomname;
   var email;
    socket.on('getAllRooms',function(data){
       if(data && data.name){
           socket.emit('roomData.'+data.name,getRoom(data.name));
       }else{
           socket.emit('roomsData',rooms);
       }
   });
   socket.on('createRoom',function(room){
     room.messages = [];
     room.users = [];
     rooms.push(room);
     io.sockets.emit('roomAdded',room);
   });

    socket.on('joinRoom',function(join){
        roomname = join.room.name;
        email = join.user.email;
        addUser(getRoom(roomname),join.user);
        socket.join(join.room.name);
        socket.emit('joinRoom.'+join.user.email,join);
        socket.in(join.room.name).broadcast.emit('joinRoom',join);
        socket.in(join.room.name).broadcast.emit('messageAdded',{
            content:join.user.email+"进入房间",
            creator:SYSTEM
        });
    });

    socket.on('createMessage',function(message){
        getRoom(message.name).messages.push(message);
        io.sockets.in(message.name).emit('messageAdded',message);
    });

    socket.on('leaveRoom',function(leave){
        deleteUser(getRoom(leave.room.name),leave.user.email);
        socket.in(leave.room.name).broadcast.emit('messageAdded',{
            content:leave.user.email+"离开了房间",
            creator:SYSTEM
        });
        socket.leave(leave.room.name);
        socket.in(leave.room.name).broadcast.emit('leaveRoom',leave);
    });

    socket.on('disconnect',function(){
        if(email && roomname){
            deleteUser(getRoom(roomname),email);
            socket.in(roomname).broadcast.emit('leaveRoom',{user:{email:email},room:{name:roomname}});

        }
    });
});