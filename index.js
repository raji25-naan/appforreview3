const express = require("express");
const mongoose = require("mongoose");
const fileuploader = require("express-fileupload");
const app = express();
app.use(express.json())
app.use(fileuploader());

const apiroute = require('./routes/apiroute')
app.use('/api/user',apiroute)

app.get('/',(req,res) => {
    res.send("Hello")
})

  

mongoose.connect('mongodb://localhost:27017/register2_db',{ useNewUrlParser: true },(err)=>{
  if(!err){

    console.log('database connected');
}
});
