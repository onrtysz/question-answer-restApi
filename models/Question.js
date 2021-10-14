const mongoose = require('mongoose')
const Schema = mongoose.Schema
const slugify = require('slugify')
const QuestionSchema = new Schema({
    title: {
        type: String,
        required: [true, "Please provide a title"],
        minlenght: [10, "please provide a title min lenght 10 characters"],
        unique: true
    },
    content: {
        type: String,
        required: [true, "please provide a content"],
        minlenght: [20, "please provide a content a least 20 charactes"],
    },
    slug: { type: String },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    user: {
        type: mongoose.Schema.ObjectId,
        required: [true],
        ref: "User"
    }
})
QuestionSchema.pre("save", function (next) {
    if (!this.isModified("title")) {
        next()
    };
    this.slug = this.makeSlug();
    next();
})


QuestionSchema.methods.makeSlug = function () {
    return slugify(this.title, {
        replacement: '-',
        remove: /[*+~.()'"!:@]/g,
        lower: false,

    });
}
module.exports = mongoose.model("Question", QuestionSchema)