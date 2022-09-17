const bigPromise = require("../middlewares/bigPromise")
const CustomError = require("../utils/customError")
const Post = require("../models/Post")
const { post } = require("../routes/userRoute")

exports.createPost = bigPromise(async (req, res, next) => {
    const { post } = req.body
    if (!post) {
        return next(new CustomError("post is required", 400))
    }
    const createdPost = await Post.create({
        description: post,
        user: req._id,
    })
    res.status(200).json({
        message: "ok",
        createdPost,
    })
})
exports.deletePost = bigPromise(async (req, res, next) => {
    const { postId } = req.body
    const post = await Post.findById(postId)
    if (!post) return next(new CustomError("post is invalid", 400))
    if (post.user === req._id) {
        await Post.findByIdAndDelete(postId)
        res.status(200).json({
            status: "ok",
            message: "post deleted",
        })
    }
})
exports.likePost = bigPromise(async (req, res, next) => {
    const { postId } = req.body
    const post = await Post.findById(postId)
    post.likes.push(req._id)
    await post.save()
    res.status(200).json({
        status: "ok",
        message: "liked",
    })
})
exports.allPost = bigPromise(async (req, res, next) => {
    const post = await Post.find()
    res.status(200).json({
        status: "ok",
        post,
    })
})
