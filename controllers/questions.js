const Question = require('../models/Question')
const customError = require('../helpers/error/CustomError')
const asyncErrorWrapper = require("express-async-handler")




const askNewQuestion = asyncErrorWrapper(async function (req, res, next) {
    const information = req.body;
    const question = await Question.create({
        ...information, //spread operatörü farklı kullanım şeklide var information.tittle gibi
        user: req.user.id
    });
    res.status(200).json({
        success: true,
        data: question
    })
})
const getAllQuestions = asyncErrorWrapper(async function (req, res, next) {
    const questions = await Question.find()
    return res.status(200).json({
        success: true,
        data: questions
    })
})

const getsingleQuestion = asyncErrorWrapper(async function (req, res, next) {
    const { id } = req.params;
    const question = await Question.findById(id)

    return res.status(200).json({
        success: true,
        data: question
    })
});
const editQuestion = asyncErrorWrapper(async function (req, res, next) {
    const { id } = req.params;
    const { title, content } = req.body;
    let question = await Question.findById(id)
    question.title = title;
    question.content = content;
    question = await question.save();
    return res.status(200).json({
        success: true,
        data: question
    })
})
const deleteQuestion = asyncErrorWrapper(async function (req, res, next) {
    const { id } = req.params;
    await Question.findByIdAndDelete(id);
    return res.status(200).json({
        success: true,
       message: 'Question deleted successfully'
    });

})
const likeQuestion = asyncErrorWrapper(async function (req, res, next) {
    const { id } = req.params;
    const question = await Question.findById(id)

    //Like etmişse
    if (question.likes.includes(req.user.id)){
        return next(new customError("You already like this question",400));
    }
    question.likes.push(req.user.id);
    await question.save();

    return res.status(200).json({
        success: true,
        data: { question}
    })

})
const UndolikeQuestion = asyncErrorWrapper(async function (req, res, next) {
    const { id } = req.params;
    const question = await Question.findById(id)

    if (!question.likes.includes(req.user.id)){
        return next(new customError("You can not undo like operation for this question",400));
    }
    const index=question.likes.indexOf(req.user.id);
    question.likes.splice(index,1)
    await question.save();
    return res.status(200).json({
        success: true,
        data: { question}
    })

})
module.exports = {
    askNewQuestion,
    getAllQuestions,
    getsingleQuestion,
    editQuestion,
    deleteQuestion,
    likeQuestion,
    UndolikeQuestion
}