const Question = require('../models/Question')
const Answer = require('../models/Answer')
const customError = require('../helpers/error/CustomError')
const asyncErrorWrapper = require("express-async-handler")


const addNewAnswerToQuestion = asyncErrorWrapper(async function (req, res, next) {
    const { question_id } = req.params;
    const user_id = req.user.id;
    const information = req.body

    const answer = await Answer.create({
        ...information,
        user: user_id,
        question: question_id
    })
    return res.status(200).json({
        succes: true,
        message: "answer operation is successful",
        data: answer
    })
})
const getAllAnswersByQuestion = asyncErrorWrapper(async function (req, res, next) {
    const { question_id } = req.params;
    const question = await Question.findById(question_id).populate("answers")


    const answers = question.answers;
    console.log(answers);

    return res.status(200).json({
        succes: true,
        data: answers,
        count: answers.length
    })
})
const getSingleAnswer = asyncErrorWrapper(async function (req, res, next) {

    const answer_id = req.params.answer_id
    const answer = await Answer.findById(answer_id)
        .populate({
            path: 'question',
            select: "title"
        })
        .populate({
            path: 'user',
            select: "fname profile_image"
        })

    return res.status(200).json({
        data: answer,
        success: true
    }
    )
})
const editAnswer = asyncErrorWrapper(async function (req, res, next) {
    const answer_id = req.params.answer_id;
    const { content } = req.body;
    answer = await Answer.findById(answer_id);
    answer.content = content;
    await answer.save();
    return res.status(200).json({
        data: answer,
        success: true
    })
})
const deleteAnswer = asyncErrorWrapper(async function (req, res, next) {
    const { answer_id } = req.params;
    const { question_id } = req.params;

    await Answer.findByIdAndDelete(answer_id)
    const question = await Question.findById(question_id)

})
module.exports = { addNewAnswerToQuestion, getAllAnswersByQuestion, getSingleAnswer, editAnswer, deleteAnswer }