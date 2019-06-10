const mongoose  = require("mongoose");
const Schema   = mongoose.Schema

const AccountSchema  = new Schema({
    username :{
         type:String,
         required:true
    },
    password:{
         type:String,
         required:true
    } ,
    email:String,
    cheackings:Number,
    transactions:[],
    card:String,
    DateJoined : new Date.toUTCString()

})

const Account   =  mongoose.model("Account",AccountSchema)

module.exports  =  Account;

