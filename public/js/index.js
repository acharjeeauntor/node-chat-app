var socket = io();

   socket.on('connect',function(){
console.log('Connected to the Server');

socket.emit('createMessage',{
   from:'Auntor',
   text:'Hlw Ontu'
});
   });

   socket.on('disconnect',function(){
      console.log('disconnectd from the server');
   });

   socket.on('newMessage',function(message){
      console.log('new Message:',message);
   });