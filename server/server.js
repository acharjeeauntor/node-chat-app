const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
var publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;

var app = express();

var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));




io.on('connection',function(socket){
console.log('new user connected');


socket.on('createMessage',function(message){
console.log('Create Message:',message);
io.emit('newMessage',{
   from:message.from,
   text:message.text,
   createAt:new Date().getTime()
});
});

socket.on('disconnect',function(){
   console.log('user was disconnectd');
});
});








server.listen(port,function(){
   console.log(`Server is now in ${port}`);
});