const expect = require('expect');

var {isRealString} = require('./validation');

describe(isRealString,()=>{
it('Should reject non-String values',()=>{
var res = isRealString(98);
expect(res).toBe(false);
});

it('should reject all sring with spece',()=>{
var res =isRealString('     ');
expect(res).toBe(false);
});

it('should allow string with non spach charecter',()=>{
   var res=isRealString('  Auntor   ');
   expect(res).toBe(true);
});


});