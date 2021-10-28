
const bcript =require('bcrypt')
const jwt =require('jsonwebtoken')
const User = require('../schemas/userSchema')



const signUp= async(req,res)=>{
    try {
    const {name,email,password}=req.body
     const emailExist=await User.findOne({email:email})

     if(emailExist){
         res.send('Email Already Signup')
     }
    
   const hashPass=await bcript.hash(password,10)

   const token =jwt.sign({userid:User._id},process.env.TOKEN,{ expiresIn:'2h'})
 
  const user= new User({
      name,
      email,
      password:hashPass,

  })

 
      const saveUser=await user.save()
      res.json({
          user:saveUser,
          token
      })
  } catch (error) {
      res.send('Error')
  }
}



const logIn= async(req,res)=>{
   try {
    const {email,password}=req.body
    const user=await User.findOne({email})
    if(!user){
        res.status(400).send('Email Not Resistor')
    }

    const validPassword=await bcript.compare(password,user.password)
   if(!validPassword){
       res.status(400).send('Password Dont Currect')
   }
    
   const token =jwt.sign({userid:user._id},process.env.TOKEN,{ expiresIn:'2h'})
   res.json({token})
   } catch (error) {
       res.send('Server error')
   }

}

const allUser=async(req,res)=>{
    
    try {
        const users= await User.find().populate("todos")
        res.status(200).json( {users })
    } catch (error) {
        res.status(400).send("sarver Error")
    }
}

const singalUser=async(req,res)=>{
     const id=req.params.id
    try {
        const users= await User.findById(id).populate("todos")
        res.status(200).json( {users })
    } catch (error) {
        res.status(400).send("sarver Error")
    }
}






module.exports={
    signUp,
    logIn,
    allUser,
    singalUser
}
