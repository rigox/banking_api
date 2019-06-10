const express = require("express")
const PORT   = process.env.PORT || $4000

const app =  express();

app.use(express.urlencoded(),express.json())

app.get("/",(req,res)=>{
     res.send("Welcome")
})




app.listen(PORT , ()=>{
      console.log(`listening on port ${PORT}`)
})