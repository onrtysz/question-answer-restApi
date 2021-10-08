const express = require('express')
const { getallauth,login,getUser,logout,ImageUpload,forgotPassword,resetPassword } = require('../controllers/auth')
const {profileImageUpload}=require("../middlewares/libraries/profileımageUpload")
const router = express.Router()
const {getAccessToRoute}=require('../middlewares/auth/auth')

router.post("/", getallauth)
router.post("/login", login)
router.post("/forgotpassword",forgotPassword)
router.post("/register", (req, res) => {
    res.send("Register Home Page")
})
router.get("/profile",getAccessToRoute,getUser)
router.get("/logout",getAccessToRoute,logout)
router.post("/resetpassword",resetPassword)
router.post("/upload",[getAccessToRoute,profileImageUpload.single("profile_image"),ImageUpload])
module.exports = router