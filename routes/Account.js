const express =  require("express")
const Account =  require("../models/Account");
const router =   express.Router();

router.get('register',(req,res)=>{
   
     var username =  req.body.username || req.query.username
     var password =  req.body.password || req.query.password
     var deposit =  req.body.deposit || req.query.password
     var email = req.body.email || req.query.email

     var account  = new Account({})



})



module.exports  = router;
