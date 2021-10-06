const express=require('express')

const router=express.Router()
const questions=require('./question')
const auth=require('./auth')

router.use('/questions',questions)
router.use('/auth',auth)

module.exports=router