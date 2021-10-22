const express= require('express')
const cors = require('cors')
const mongoose = require('mongoose');
const bodyParser=require('body-parser')
const app=express()

require('dotenv').config()
const port=process.env.PORT



const router = require('./routers/userRouter');
const auth = require('./middlewares/veryfyToken');
const todoRouter = require('./routers/todoRouter');






app.use(express.json())
app.use(bodyParser.json());
app.use(cors())

const connect= async()=>{
  try {
   await mongoose.connect(process.env.DB)
    console.log("Database conncet");
  } catch (error) {
     console.log(error);
  }
} 
connect()

app.use('/api',router)
app.use('/todo',todoRouter)
app.get('/',auth,(req,res)=>{
  res.send('hello')
})

app.use("*",(req,res)=>{
  res.send("request was not found")
 
})

app.listen(port,()=>{
   console.log(`Server is Running Port ${port}`);
})