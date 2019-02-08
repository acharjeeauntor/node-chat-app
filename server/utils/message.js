var moment =require('moment');
var genarateMessage = (from,text)=>{
return{
   from,
   text,
   createAt:moment().valueOf()
}
};

var genarateLocationMessage = (from,latitude,longitude)=>{
   return{
      from,
      url:`http://www.google.com/maps?q=${latitude},${longitude}`,
      createAt:moment().valueOf()
   }
   };



module.exports ={genarateMessage,genarateLocationMessage}