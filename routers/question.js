const express=require('express')
const {getAllQuestions}=require('../controllers/questions')
const router=express.Router()
const {askNewQuestion,getsingleQuestion}=require('../controllers/questions')
const {getAccessToRoute}=require('../middlewares/auth/auth')
const {checkQuestionExist}=require('../middlewares//database/databaseErrorHelpers')


router.post("/ask",getAccessToRoute,askNewQuestion)
router.get("/",getAllQuestions)
router.get("/:id",checkQuestionExist,getsingleQuestion)
module.exports=router