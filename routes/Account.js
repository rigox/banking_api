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
     var deposit =  Number(req.body.deposit || req.query.deposit)
     var email = req.body.email || req.query.email

    var newAccount  = new Account({
            username:username,
            password:password,
            email:email,
            draft:false,
            checkings: Number(deposit)
    });
 
    Account.find({"username":username})
    .then(user=>{
          if(user.length===0){
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
          }else{
            res.send(404,{"message":"Username is already in use"})

          }
          
    })
    .catch((err)=>{
        
    })
   
})

//route for the  user to log  in
router.get('/login',(req,res)=>{
   const username  =  req.query.username || req.body.username;
   const password    = req.query.password ||  req.body.password
  Account.find({'username':username})
  .then(user=>{
   if(user.length===0){
       res.send(404,{"message":"Userame is invalid"})
   }     
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
  .catch((err)=>{res.send(404,{'message':err})})
});


router.put('/add_funds',verifyToken,(req,res)=>{

      const  username  = req.body.username || req.query.username
      const  funds   = Number( req.body.funds || req.query.funds)
    Account.updateOne({"username":username},{$inc:{"checkings":funds}}).then(a=>{
          res.status(200).send({"message":"funds added "})
    }).catch(err=>{res.send(404,{'message':err})})

})


router.get('/withdraw',verifyToken,(req,res)=>{
    const  username =  req.query.username || req.body.username
    const  amount   = Number(req.query.amount || req.body.amount)
    Account.find({'username':username})
    .then(user=>{
          if(user.length==0){res.send(404,{"message":"User was not found"})}
          else if(user[0].checkings>=amount){
                const withDrawAmount =  amount                
                Account.updateOne({'username':username},{$inc:{'checkings':-withDrawAmount}})
                .then(a=>{res.send({"money":withDrawAmount})})
                .catch(err=>res.send(404,{"message":err}))
            }
          res.send({"Message":"There are not enough funds on your account"})
    })
    .catch(err=>{res.send(400,{"message":err})})
});

// use  to verify   the users token
function verifyToken(req,res,next){

    const header =  req.headers["authorization"]
    
    if(typeof(header)!=="undefined"){
            const bearer =  header.split(' ')
            const bearerToken =  bearer[1]
            
            req.token =  bearerToken

            jwt.verify(req.token,keys.secret,function(err,data){
                        if(err){res.send(403)}
                        else{
                            next();
                        }
            });
            
    }else{
        res.send(404,{"message":"Error"})
    }


}





module.exports  = router;
