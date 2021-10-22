const express=require('express')
const { signUp, logIn, allUser } = require('../controllers/userController')
const auth = require('../middlewares/veryfyToken')
const router= express.Router()



router.post('/signup',signUp)
router.post('/login',logIn)
router.get('/loginuser',auth,allUser)


module.exports=router