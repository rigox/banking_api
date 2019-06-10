const moongose  = require("mongoose");
const keys  = require("../config/keys");
moongose.Promise =  global.Promise


moongose.connect(keys.mongo_url,(err)=>{
     if(err){console.log(err)}
     console.log("Connnection  ok")
})

module.exports   = moongose;



