var genarateMessage = (from,text)=>{
return{
   from,
   text,
   createAt:new Date().getTime()
}
};

module.exports ={genarateMessage}