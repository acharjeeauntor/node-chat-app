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

class Users{
   constructor(){
      this.users=[]
   }
   addUser(id,name,room){
      var user={id,name,room};
      this.users.push(user);
      return user;
   }
}
module.exports = {Users};