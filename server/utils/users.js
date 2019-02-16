// class Person {
//    constructor(name,age){
//       this.name = name;
//       this.age = age;
//    }
//    getUserDes(){

//    }
// }
// var me = new Person('Auntor',20);
// me.getUserDes();

class Users {
   constructor(){
      this.users=[]
   }
   addUser(id,name,room){
      var user={id,name,room};
      this.users.push(user);
      return user;
   }
   removeUser(id){
var user = this.getUser(id);
if(user){
this.users = this.users.filter((user)=>user.id !==id);
}
return user;
   }



   getUser(id){
return this.users.filter((user)=>user.id === id)[0]
   }


   getUserList(room){
var users = this.users.filter((user)=> user.room === room);
var nameArray = users.map((user)=>user.name);
return nameArray;
   }


}
module.exports = {Users};