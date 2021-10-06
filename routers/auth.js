const express = require('express')
const { getallauth,login,getUser,logout } = require('../controllers/auth')
const {profileImageUpload}=require("../middlewares/libraries/profileımageUpload")
const router = express.Router()
const {getAccessToRoute}=require('../middlewares/auth/auth')

router.post("/", getallauth)
router.post("/login", login)
router.post("/register", (req, res) => {
    res.send("Register Home Page")
})
router.get("/profile",getAccessToRoute,getUser)
router.get("/logout",getAccessToRoute,logout)
router.post("/upload",getAccessToRoute,profileImageUpload.single("profile_image"))
module.exports = router