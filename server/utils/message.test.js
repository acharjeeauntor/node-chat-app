var expect = require('expect');

var {genarateMessage} = require('./message');

describe('genarateMessage',()=>{
it('should generate correct message',()=>{
var from = 'auntor';
var text = 'some text';
var message = genarateMessage(from, text);
expect(message.createAt).toBeA('number');
expect(message).toInclude({from, text});



});
});