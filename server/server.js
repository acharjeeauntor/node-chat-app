const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');


const {genarateMessage,genarateLocationMessage} = require('./utils/message');
const{isRealString} = require('./utils/validation');
var publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;

var app = express();

var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));




io.on('connection',function(socket){
console.log('new user connected');




socket.on('join',(params,callback)=>{
if(!isRealString(params.name) || !isRealString(params.room)){
callback('Name and Room Name are reuired.');
}

socket.join(params.room);
socket.emit('newMessage',genarateMessage('Admin','welcome to the chat app'));
socket.broadcast.to(params.room).emit('newMessage',genarateMessage('Admin',`${params.name} has join`));
callback();
});


socket.on('createMessage',function(message,callback){
console.log('Create Message:',message);
io.emit('newMessage',genarateMessage(message.from , message.text));
callback();
});


socket.on('createLocationMessage',function(coords){
io.emit('newLocationMessage',genarateLocationMessage('Admin',coords.latitude,coords.longitude));
});


socket.on('disconnect',function(){
   console.log('user was disconnected');
});
});








server.listen(port,function(){
   console.log(`Server is now in ${port}`);
});