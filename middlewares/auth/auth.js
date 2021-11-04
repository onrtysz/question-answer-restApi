const customError = require('../../helpers/error/CustomError')
const jwt = require('jsonwebtoken')
const asyncErrorWrapper = require("express-async-handler")
const User = require("../../models/User")
const { isTokenInclueded, getAccessTokenFromHeader } = require('../../helpers/authorization/tokentest');
const CustomError = require('..//../helpers/error/CustomError');
const Question = require('../../models/Question')
const Answer=require('../../models/Answer')
const getAccessToRoute = function (req, res, next) {
    //Token
    const { JWT_SECRET_KEY } = process.env;
    if (!isTokenInclueded(req)) {
        return next(new customError("You are not authorized to access to access this route", 400))
    };
    const accessToken = getAccessTokenFromHeader(req);
    jwt.verify(accessToken, JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return next(new CustomError("You are not authorized ", 400))
        }
        req.user = {
            id: decoded.id,
            fname: decoded.fname
        };

        next();
    })

}
const getAdminAccess = asyncErrorWrapper(async function (req, res, next) {
    const { id } = req.user;

    const user = await User.findById(id);
    if (user.role !== "Admin") {
        return next(new customError("Only admins access to route"))
    };
    next();
});
const getQuestionOwner = asyncErrorWrapper(async function (req, res, next) {
    const UserId = req.user.id;
    const questionId = req.params.id;

    const question = await Question.findById(questionId);

    if (question.user != UserId) {
        return next(new customError("Only owner can handle this question", 403))
    };
    next();
});
const getAnswerOwnerAccess = asyncErrorWrapper(async function (req, res, next) {
    const UserId = req.user.id;
    const answer_id = req.params.answer_id;

    const answer = await Answer.findById(answer_id);

    if (answer.user != UserId) {
        return next(new customError("Only owner can handle this question", 403))
    };
    next();
});


module.exports = {
    getAccessToRoute,
    getAdminAccess,
    getQuestionOwner,
    getAnswerOwnerAccess
}