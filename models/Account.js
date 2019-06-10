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
    checkings:Number,
    transactions:[],
    card:String,
    draft:{
         required:true,
         type:Boolean
    },
    DateJoined : {
         required:true,
         type:String,
         default:new Date().toUTCString()
    }

})

const Account   =  mongoose.model("Account",AccountSchema)

module.exports  =  Account;

