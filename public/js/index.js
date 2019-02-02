var socket = io();

   socket.on('connect',function(){
console.log('Connected to the Server');
   });

   socket.on('disconnect',function(){
      console.log('disconnectd from the server');
   });

   socket.on('newMessage',function(message){
      console.log('new Message:',message);
      var li = jQuery('<li></li>');
      li.text(`${message.from}: ${message.text}`);

   jQuery('#message-show').append(li);

   });


   jQuery('#message-form').on('submit',function(e){
e.preventDefault();
socket.emit('createMessage',{
   from:'User',
   text:jQuery('[name=message]').val()
},function(){
   
});
   });