const bigPromise = require("../middlewares/bigPromise")
const { cookieToken } = require("../utils/cookieToken")
const CustomError = require("../utils/customError")
const User = require("../models/User")
const lighthouse = require("@lighthouse-web3/sdk")

exports.userSignUp = bigPromise(async (req, res, next) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        return next(new CustomError("name email password is required", 400))
    }
    try {
        const user = await User.create({
            name,
            email,
            password,
        })
        user.password = undefined
        cookieToken(user, res)
    } catch (error) {
        return next(error)
    }
})
exports.userLogin = bigPromise(async (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) {
        return next(new CustomError("email and password is required", 400))
    }
    const user = await User.findOne({ email }).select("+password")
    if (!user) {
        return next(new CustomError("email and password is invalid", 400))
    }
    const validatePassword = await user.isValidatePassword(password)
    if (!validatePassword) {
        return next(new CustomError("email and password is invalid", 400))
    }
    user.password = undefined
    cookieToken(user, res)
})
exports.userChanges = bigPromise(async (req, res, next) => {
    const user = await User.findById(req._id)
    if (!user) {
        return next(new CustomError("user not found"))
    }
    if (req.body.interest) {
        const { interest } = req.body
        user.interest.push(...interest)
        const newUser = await user.save()
        res.status("200").json({
            status: "ok",
            interest: newUser.interest,
        })
    } else if (req.body.about) {
        const { about } = req.body
        user.about = about
        const newUser = await user.save()
        res.status("200").json({
            status: "ok",
            about: newUser.about,
        })
    } else if (req.files.photo) {
        const { photo } = req.files
        const path = photo.tempFilePath
        const apiKey = process.env.API_KEY
        const response = await lighthouse.deploy(path, apiKey)
        user.photo.securedUrl = `https://ipfs.io/ipfs/${response.data.Hash}`
        user.photo.hash = response.data.hash
        const newUser = user.save()
        res.status("200").json({
            status: "ok",
            photo: newUser.photo,
        })
    } else if (req.files.coverPhoto) {
        const { coverPhoto } = req.files
        const path = coverPhoto.tempFilePath
        const apiKey = process.env.API_KEY
        const response = await lighthouse.deploy(path, apiKey)
        user.coverPhoto.securedUrl = `https://ipfs.io/ipfs/${response.data.Hash}`
        user.coverPhoto.hash = response.data.hash
        const newUser = user.save()
        res.status("200").json({
            status: "ok",
            coverPhoto: newUser.coverPhoto,
        })
    }
})
exports.followers = bigPromise(async (req, res, next) => {
    const { userId } = req.body
    if (userId === req._id) return next(new CustomError("invalid", 400))
    const user = await User.findById(userId)
    user.followers.push(req._id)
    const followingUser = await User.findById(req._id)
    console.log(followingUser)
    followingUser.following.push(userId)
    await user.save()
    await followingUser.save()
    res.status(200).json({
        status: "ok",
    })
})
