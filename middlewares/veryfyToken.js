
const jwt=require('jsonwebtoken')

const auth=(req,res,next)=>{
   const {authorization}=req.headers
   try {
       const token=authorization.split(' ')[1]
       const decoded=jwt.verify(token,process.env.TOKEN)
       const {userid}=decoded
         req.userid=userid
         next()
   } catch (error) {
      res.status(400).send('invalate token')
   }
}

module.exports=auth
