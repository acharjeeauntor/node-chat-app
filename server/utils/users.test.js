const expect = require('expect');
const Users = require('./users');
describe('Users',()=>{
var users;
beforeEach(()=>{
users = new Users();
users.users=[{
   id:1,
   name:'Auntor',
   room:'node js'
},{
   id:2,
   name:'ontu',
   room:'angular js'
},{
   id:3,
   name:'Ridoy',
   room:'node js'
}]

});
it('Should add new users',()=>{
var users= new Users();
var user = {
   id:'123',
   name:'Auntor',
   room:'The Fans'
};
var resUser = users.addUser(user.id,user.name,user.room);
expect(users.users).toEqual([user]);
});

it('should returns name for the Node courses',()=>{
var userList = users.getUsersList('node js');
expect(userList).toEqual(['Auntor','Ridoy']);
});
it('should returns name for the angular courses',()=>{
   var userList = users.getUsersList('angular js');
   expect(userList).toEqual(['ontu']);
   });
   
});
