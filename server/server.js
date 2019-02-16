const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const {Users} = require('./utils/users');


const {genarateMessage,genarateLocationMessage} = require('./utils/message');
const{isRealString} = require('./utils/validation');
var publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;

var app = express();

var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();
app.use(express.static(publicPath));


io.on('connection',function(socket){
console.log('new user connected');





socket.on('join',(params,callback)=>{
if(!isRealString(params.name) || !isRealString(params.room)){
return callback('Name and Room Name are reuired.');
}

socket.join(params.room);
users.removeUser(socket.id);
users.addUser(socket.id,params.name,params.room);

io.to(params.room).emit('updateUserList',users.getUserList(params.room));

socket.emit('newMessage',genarateMessage('Admin','welcome to the chat app'));
socket.broadcast.to(params.room).emit('newMessage',genarateMessage('Admin',`${params.name} has join`));
callback();
});


socket.on('createMessage',function(message,callback){
var user = users.getUser(socket.id);
if(user && isRealString(message.text)){
   io.to(user.room).emit('newMessage',genarateMessage(user.name, message.text));
}

callback();
});


socket.on('createLocationMessage',function(coords){
   var user = users.getUser(socket.id);
if(user){
   io.to(user.room).emit('newLocationMessage',genarateLocationMessage(user.name,coords.latitude,coords.longitude));
}

});


socket.on('disconnect',function(){
  var user = users.removeUser(socket.id);
  if(user){
io.to(user.room).emit('updateUserList',users.getUserList(user.room));
io.to(user.room).emit('newMessage',genarateMessage('Admin',`${user.name} has left`));
  }
});
});







server.listen(port,function(){
   console.log(`Server is now in ${port}`);
});