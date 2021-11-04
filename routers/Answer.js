const express = require('express');
const router = express.Router({mergeParams: true});
const {getAccessToRoute}=require('../middlewares/auth/auth')
const {addNewAnswerToQuestion,getAllAnswersByQuestion,getSingleAnswer,editAnswer,deleteAnswer}=require('../controllers/answer')
const {checkQuestionAndAnswer}=require('../middlewares/database/databaseErrorHelpers')
const {getAnswerOwnerAccess}=require('../middlewares/auth/auth')

router.post('/',getAccessToRoute,addNewAnswerToQuestion )
router.get('/',getAllAnswersByQuestion )
router.get('/:answer_id',checkQuestionAndAnswer, getSingleAnswer)
router.put('/:answer_id/edit',[checkQuestionAndAnswer,getAccessToRoute,getAnswerOwnerAccess], editAnswer)
router.delete('/:answer_id/delete',[checkQuestionAndAnswer,getAccessToRoute,getAnswerOwnerAccess], deleteAnswer)

module.exports= router