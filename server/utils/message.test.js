const expect = require('expect');

var {genarateMessage,genarateLocationMessage} = require('./message');

describe('genarateMessage',()=>{
it('should generate correct message',()=>{
var from = 'auntor';
var text = 'some text';
var message = genarateMessage(from, text);
expect(message.createAt).toBeA('number');
expect(message).toInclude({from, text});

});
});

describe('genarateLocationMessage',()=>{
   it('should generate correct Location',()=>{
   var from = 'auntor';
   var latitude = 10;
   var longitude = 15;
   var url = 'http://www.google.com/maps?q=10,15';
   var message = genarateLocationMessage(from,latitude,longitude);


   expect(message.createAt).toBeA('number');
   expect(message).toInclude({from,url});
   });
   });