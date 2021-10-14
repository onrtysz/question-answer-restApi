const User = require('../models/User')
const customError = require('../helpers/error/CustomError')
const asyncErrorWrapper = require("express-async-handler")

const blockUser = asyncErrorWrapper(async function (req, res, next) {
    const { id } = req.params

    const user = await User.findById(id)

    user.blocked = !user.blocked

    await user.save()
    return res.status(200).json({
        success: true,
        message: "Blocked-Unblocked sucesfull"
    })

});
const deleteUser = asyncErrorWrapper(async function (req, res, next) {
    const { id } = req.params

    const user = await User.findById(id)

    await user.remove()

    return res.status(200).json({
        success:true,
        message:"delete operation is succesful"
    })

})

module.exports = {
    blockUser,
    deleteUser
}