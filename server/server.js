const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');


const {genarateMessage,genarateLocationMessage} = require('./utils/message');
var publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;

var app = express();

var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));




io.on('connection',function(socket){
console.log('new user connected');


socket.emit('newMessage',genarateMessage('Admin','welcome to the chat app'));

socket.broadcast.emit('newMessage',genarateMessage('Admin','new user joined'));



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