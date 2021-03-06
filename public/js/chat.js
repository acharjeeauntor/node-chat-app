var socket = io();

function scrollToBottom(){
var message = jQuery('#message-show');
var newMessage = message.children('li:last-child');

var clientHeight = message.prop('clientHeight');
var scrollTop = message.prop('scrollTop');
var scrollHeight = message.prop('scrollHeight');
var newMessageHeight = newMessage.innerHeight();
var lastMessageHeight = newMessage.prev().innerHeight();

if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
   message.scrollTop(scrollHeight);
}
}

   socket.on('connect',function(){
      // console.log('disconnectd from the server');
var params = jQuery.deparam(window.location.search);
socket.emit('join',params,function(err){
if(err){
alert(err);
window.location.href = '/';
}else{
console.log('no error');
}
});
   });

   socket.on('disconnect',function(){
      console.log('disconnectd from the server');
   });

   socket.on('updateUserList',function(users){
var ol = jQuery('<ol></ol>');
users.forEach(function(user){
ol.append(jQuery('<li></li>').text(user));

});
jQuery('#users').html(ol);
   });

   socket.on('newMessage',function(message){
      var formattedTime = moment(message.createdAt).format('h:mm a');
      var template = jQuery('#message-template').html();
      var html = Mustache.render(template,{
         text:message.text,
         from:message.from,
         createAt:formattedTime
      });
      jQuery('#message-show').append(html);
      scrollToBottom();

   //    var formattedTime = moment(message.createdAt).format('h:mm a');
   //    var li = jQuery('<li></li>');
   //    li.text(`${message.from} ${formattedTime}: ${message.text}`);

   // jQuery('#message-show').append(li);

   });


   socket.on('newLocationMessage',function(message){
      var formattedTime = moment(message.createdAt).format('h:mm a');
      var template = jQuery('#location-message-template').html();
      var html = Mustache.render(template,{
         from:message.from,
         url:message.url,
         createAt:formattedTime
      });
      jQuery('#message-show').append(html);
      scrollToBottom();
   });

var messageTextBox = jQuery('[name=message]');

   jQuery('#message-form').on('submit',function(e){
e.preventDefault();
socket.emit('createMessage',{
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