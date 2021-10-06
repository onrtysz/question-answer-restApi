const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const UserSchema = new Schema({


    fname: {
        type: String,
        required: [true, "Please provide a name"]
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
        match: [
            /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Please provide a valid mail"
        ]
    },
    role: {
        type: String,
        default: "User",
        enum: ["User", "Admin"]
    },
    password: {
        type: String,
        minlenght: 6,
        required: [true, "Please provide a mail"],
        select: false, //tüm kullancıcları çekince şifrelerin görünmemesi için
    },
    createdAt: { type: Date, default: Date.now },
    title: {
        type: String
    },
    about: { type: String },
    place: { type: String },
    website: { type: String },
    profile_image: {
        type: String,
        default: "default.jpg"
    },
    blocked: {
        type: Boolean,
        default: false
    }
})

//User Schema Methods
UserSchema.methods.generateJwtFromUser= function (){
    const {JWT_SECRET_KEY,JWT_EXPIRE}=process.env
    const payload={
        id:this.id,
        fname:this.fname
    }
   const token=jwt.sign(payload,JWT_SECRET_KEY,{expiresIn:JWT_EXPIRE})
   return token

}

UserSchema.pre("save", function (next) {
//Parola değişmemişse
if (!this.isModified("password")) {
    next()
}
    bcrypt.genSalt(10, (err, salt) => {
        if (err) next(err)
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) next(err)
            this.password = hash
            next()
        });
    });

})

module.exports = mongoose.model("User", UserSchema)