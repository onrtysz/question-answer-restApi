const Question=require('../models/Question')
const customError = require('../helpers/error/CustomError')
const asyncErrorWrapper = require("express-async-handler")




const askNewQuestion=asyncErrorWrapper(async function (req, res, next) {
    const information=req.body;
    const question=await Question.create({
        ...information, //spread operatörü farklı kullanım şeklide var information.tittle gibi
        user:req.user.id
    });
    res.status(200).json({
        success: true,
        data:question
    })
})
   const getAllQuestions=asyncErrorWrapper(async function (req, res, next) {
       const questions=await Question.find()
       return res.status(200).json({
           success: true,
           data: questions
       })
   })

const getsingleQuestion=asyncErrorWrapper(async function (req, res, next) {
    const { id}=req.params;
    const question=await Question.findById(id)
console.log(question)
    return res.status(200).json({
        success: true,
        data: question
    })
})
module.exports={
    askNewQuestion,
    getAllQuestions,
    getsingleQuestion
}