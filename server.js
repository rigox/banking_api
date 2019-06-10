const express = require("express")
const PORT   = process.env.PORT || 4000
const mongoose = require("./models/mongoose");
const Account = require("./routes/Account");
const app =  express();

app.use(express.urlencoded(),express.json())

app.get("/",(req,res)=>{
     res.send("Welcome")
})

//routes
app.use('/Account',Account);


app.listen(PORT , ()=>{
      console.log(`listening on port ${PORT}`)
})