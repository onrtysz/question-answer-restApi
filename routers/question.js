const express=require('express')
const {getAllQuestions}=require('../controllers/questions')
const router=express.Router()
const {askNewQuestion,getsingleQuestion,editQuestion,deleteQuestion,likeQuestion,UndolikeQuestion}=require('../controllers/questions')
const {getAccessToRoute,getQuestionOwner}=require('../middlewares/auth/auth')
const {checkQuestionExist}=require('../middlewares//database/databaseErrorHelpers')
const answers = require('./Answer')

router.post("/ask",getAccessToRoute,askNewQuestion)
router.get("/",getAllQuestions)
router.get("/:id/like",[getAccessToRoute,checkQuestionExist],likeQuestion)
router.get("/:id/Undolike",[getAccessToRoute,checkQuestionExist],UndolikeQuestion)
router.get("/:id",checkQuestionExist,getsingleQuestion)
router.put("/:id/edit",[getAccessToRoute,checkQuestionExist,getQuestionOwner],editQuestion)
router.delete("/:id/delete",[getAccessToRoute,checkQuestionExist,getQuestionOwner],deleteQuestion)

router.use("/:question_id/answer",checkQuestionExist,answers)
module.exports=router