const User = require('../models/User')
const { sendJwtToClient } = require("../helpers/authorization/tokentest")
const CustomError = require('../helpers/error/CustomError')
const asyncErrorWrapper = require('express-async-handler')
const { validateUser, comparePassword } = require('../helpers/Input/İnputhelpers')
const { sendEmail } = require('../helpers/libraries/sendEmail')
const getallauth = asyncErrorWrapper(async (req, res, next) => {

    const { fname, email, password, role } = req.body
    const user = await User.create({
        fname,
        email,
        password,
        role
    })
    sendJwtToClient(user, res)
})
const logout = asyncErrorWrapper(async (req, res, next) => {
    const { NODE_ENV } = process.env
    return res.status(200).cookie({
        httpOnly: true,
        expires: new Date(Date.now()),
        secure: NODE_ENV === "development" ? false : true
    }).json({
        success: true,
        message: "Logouut succesfull"
    })

})
const login = asyncErrorWrapper(async (req, res, next) => {
    const { email, password } = req.body
    if (!validateUser(email, password)) {
        return next(new CustomError("Please check your input", 400))
    };
    const user = await User.findOne({ email }).select("+password");
    if (!comparePassword(password, user.password)) {
        return next(new CustomError("Please check your credentials", 400));
    };

    sendJwtToClient(user, res)
})
const ImageUpload = asyncErrorWrapper(async (req, res, next) => {
    //Image upload succes
    const user = await User.findByIdAndUpdate(req.user.id, { "profile_image": req.savedProfileImage }, {
        new: true,
        runValidators: true
    })
    res.status(200)
        .json({
            success: true,
            message: "Image upload succesful",
            data: user
        });
})
const getUser = (req, res, next) => {
    res
        .json({
            success: true,
            data: {
                id: req.user.id,
                fname: req.user.fname
            }
        })
}
const forgotPassword = asyncErrorWrapper(async (req, res, next) => {
    const resetEmail = req.body.email;
    const user = await User.findOne({ email: resetEmail })
    if (!user) {
        return next(new CustomError("There is no user with thar email", 400))
    }
    const resetPasswordToken = user.getResetTokenFromUser();
    await user.save()
    const resetpasswordURl = `http://localhost:4000/api/auth/resetpassword?resetPasswordToken=${resetPasswordToken}`;

    const emailTemplate = `
    <h3> Reset your password</h3>
    <p> This <a href = "${resetpasswordURl}" target='_blank'>link</a> will expire in 1 hour</p>`

        ;
    try {
        await sendEmail({
            from: process.env.SMTP_USER,
            to: resetEmail,
            subject: "reset your password",
            html: emailTemplate
        })
        return res.status(200).json({
            success: true,
            message: "Token sent to your email"
        })
    }
    catch (err) {
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined

        await user.save()

        return next(new CustomError("Email could not", 500))
    }
})
const resetPassword = asyncErrorWrapper(async (req, res, next) => {
    const { resetPasswordToken } = req.query;
    const { password } = req.body;

    if (!resetPasswordToken) {
        next(new CustomError("Please provide a valid", 400))
    };
    if (!password) {
        next(new CustomError("Please provide a new password", 400))
    }
    let user = await User.findOne({
        resetPasswordToken: resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    });
    if (!user) {
        next(new CustomError("Invalid Token", 404))
    }
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    return res.status(200).
        json({
            success: true,
            message: "Reset proccess is completed"
        })
})
module.exports = {
    getallauth,
    login,
    getUser,
    logout,
    ImageUpload,
    forgotPassword,
    resetPassword
}