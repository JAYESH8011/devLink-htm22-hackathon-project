const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: [40, "name must be less than 40 charcter"],
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: [true, "email already exist"],
        validate: [(val) => validator.isEmail(val), "email is invalid"],
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minlength: [6, "password must be atleast 6 character long"],
        select: false,
    },
    interest: [
        {
            type: String,
        },
    ],
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
    ],
    about: {
        type: String,
    },
    photo: {
        hash: {
            type: String,
        },
        securedUrl: {
            type: String,
        },
    },
    coverPhoto: {
        hash: {
            type: String,
        },
        securedUrl: {
            type: String,
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})
userSchema.pre("save", async function () {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10)
    }
})
userSchema.methods.isValidatePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}
userSchema.methods.getJwtToken = function () {
    const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY,
    })
    return token
}
module.exports = mongoose.model("User", userSchema)
