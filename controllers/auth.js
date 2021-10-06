const User = require('../models/User')
const { sendJwtToClient } = require("../helpers/authorization/tokentest")
const CustomError = require('../helpers/error/CustomError')
const asyncErrorWrapper = require('express-async-handler')
const {validateUser,comparePassword} = require('../helpers/Input/İnputhelpers')
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
const logout=asyncErrorWrapper(async (req, res, next) =>{
    const {NODE_ENV}=process.env
    return res.status(200).cookie({
        httpOnly:true,
        expires:new Date(Date.now()),
        secure:NODE_ENV==="development" ? false : true
    }).json({
        success:true,
        message:"Logouut succesfull"
    })

})
const login = asyncErrorWrapper(async (req, res, next) => {
    const { email, password } = req.body
    if (!validateUser(email, password)) {
     return  next(new CustomError("Please check your input",400))
    };
    const user=await User.findOne({email}).select("+password");
    if (!comparePassword(password,user.password)){
        return next(new CustomError("Please check your credentials",400));
    };
  
    sendJwtToClient(user, res)
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
module.exports = {
    getallauth,
    login,
    getUser,
    logout
}