var socket = io();

   socket.on('connect',function(){
console.log('Connected to the Server');
   });

   socket.on('disconnect',function(){
      console.log('disconnectd from the server');
   });

   socket.on('newMessage',function(message){
      var formattedTime = moment(message.createdAt).format('h:mm a');
      var li = jQuery('<li></li>');
      li.text(`${message.from} ${formattedTime}: ${message.text}`);

   jQuery('#message-show').append(li);

   });


   socket.on('newLocationMessage',function(message){
      var formattedTime = moment(message.createdAt).format('h:mm a');
      var li = jQuery('<li></li>');
      var a = jQuery('<a target="_blank">This is my current Location</a>');

      li.text(`${message.from} ${formattedTime}:`);
      a.attr('href',message.url);
      li.append(a);
      jQuery('#message-show').append(li);
   });

var messageTextBox = jQuery('[name=message]');

   jQuery('#message-form').on('submit',function(e){
e.preventDefault();
socket.emit('createMessage',{
   from:'User',
   text:messageTextBox.val()
},function(){
   messageTextBox.val('');
});
   });

   var locationButton = jQuery('#send-location');
   locationButton.on('click',function(){
   if(!navigator.geolocation){
      return alert('Geolocation not supported by your browser.');
   }

locationButton.attr('disabled','disabled').text('Sending location...');

   navigator.geolocation.getCurrentPosition(function(position){
      locationButton.removeAttr('disabled').text('Send location');
socket.emit('createLocationMessage',{
latitude: position.coords.latitude,
longitude: position.coords.longitude
});
   },function(){
      locationButton.removeAttr('disabled').text('Send location');
      alert('unable to fatch location.');
   });
   });