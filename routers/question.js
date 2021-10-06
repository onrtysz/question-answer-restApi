const express=require('express')
const {getAllQuestions}=require('../controllers/questions')
const router=express.Router()

router.get ("/question", getAllQuestions)

router.get("/delete",(req,res)=>{
    res.send("Delete Home Page")
})
router.get("/edit",(req,res)=>{
    res.send("Question Edit Home Page")
})
router.get("/merge",(req,res)=>{
    res.send("Question Merge Home Page")
})

module.exports=router