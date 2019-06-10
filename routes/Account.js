const express =  require("express")
const Account =  require("../models/Account");
const router =   express.Router();
const  bcrypt   = require("bcryptjs");
const jwt  =  require("jsonwebtoken")
const keys   = require("../config/keys")
//route for  opening an account
router.post('/register',(req,res)=>{
   
     var username =  req.body.username || req.query.username
     var password =  req.body.password || req.query.password
     var deposit =  req.body.deposit || req.query.password
     var email = req.body.email || req.query.email

    var newAccount  = new Account({
            username:username,
            password:password,
            email:email,
            draft:false,
            checkings: Number(deposit)
    });

    bcrypt.genSalt(10,(err,salt)=>{
          bcrypt.hash(newAccount.password,salt,(err,hash)=>{
              if(err){throw err}
              newAccount.password  = hash

              newAccount.save((err)=>{if(err){res.send(err)}
                else{
                    res.send("Account created")
                }
            })
          })
    })
})

//route for the  user to log  in
router.get('/login',(req,res)=>{
   const username  =  req.query.username || req.body.username;
   const password    = req.query.password ||  req.body.password
  Account.find({'username':username})
  .then(user=>{
      bcrypt.compare(password,user[0].password,(err,isMatch)=>{
           if(isMatch){
               jwt.sign({user:user},keys.secret,{expiresIn:'5h'},(err,token)=>{
                   res.send(token)
               })
           }
           if(err){
                res.send(404,{"message":"Password is  incorrect"})
           }
      })
  })
  .catch((err)=>{throw err})
});


module.exports  = router;
