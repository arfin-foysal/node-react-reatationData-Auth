const express=require('express')
const { signUp, logIn, allUser, singalUser } = require('../controllers/userController')
const auth = require('../middlewares/veryfyToken')
const router= express.Router()



router.post('/signup',signUp)
router.post('/login',logIn)
router.get('/loginuser',auth,allUser)
router.get('/signal/:id',auth,singalUser)


module.exports=router