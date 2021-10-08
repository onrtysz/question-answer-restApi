const multer = require('multer')
const path = require('path')
const CustomError = require("../../helpers/error/CustomError")

//Storage Filefilter

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const rootDir = path.dirname(require.main.filename)
        cb(null, path.join(rootDir, "/public/uploads"))

    },
    filename: function (req, file, cb) {
        //File/ minetype -image,gif,jpg

        const extension = file.mimetype.split("/")[1];
        req.savedProfileImage = "Image_" + req.user.id + "." + extension
        cb(null, req.savedProfileImage)
    }
})

const fileFilter =  (req, file, cb)=> {
    let alloweMimeTypes = ["image/jpg", "image/gif", "image/jpeg", "image/png"]
    if (!alloweMimeTypes.includes(file.mimetype)) {
        return cb(new CustomError("Please provide a valid image file", 400),false)
    }
    return cb(null,true)
}
const profileImageUpload=multer({storage,fileFilter})
module.exports={
    profileImageUpload
}
