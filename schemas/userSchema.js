const mongoose=require('mongoose')
const validator = require('validator');
 
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
       
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid Email')
            }
        }

    },
    password:{
        type:String,
        required:true,
        minlength:5
    },
    todos:[
        {
            type:mongoose.Types.ObjectId,
            ref:"Todo"
        }
    ]

})


const User=mongoose.model("User",userSchema)

module.exports=User