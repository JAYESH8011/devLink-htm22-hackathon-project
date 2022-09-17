const bigPromise = require("../middlewares/bigPromise")
const CustomError = require("../utils/customError")
const Communities = require("../models/Communities")

exports.joinCommunities = bigPromise(async (req, res, next) => {
    const { commId } = req.body
    const communities = await Communities.findById(commId)
    if (!communities) return next(new CustomError("community not found", 404))
    communities.joinedUser.push(req._id)
    await communities.save()
    res.status(200).json({
        status: "ok",
        message: "joined community",
    })
})
exports.leaveCommunities = bigPromise(async (req, res, next) => {
    const { commId } = req.body
    const communities = await Communities.findById(commId)
    if (!communities) return next(new CustomError("community not found", 404))
    communities.joinedUser.filter((elem) => {
        elem.toString() !== req._id
    })
    if (communities.joinedUser.length === 0) {
        await communities.deleteOne()
        return res.status(200).json({
            status: "ok",
            message: "community deleted",
        })
    }
    await communities.save()
    res.status(200).json({
        status: "ok",
        message: "left community",
    })
})
exports.createCommunities = bigPromise(async (req, res, next) => {
    const { name, interest } = req.body
    if (!name || !interest)
        return next(new CustomError("name and interest is mandatory", 400))
    const communities = await Communities.create({
        name,
        interest,
        joinedUser: [req.id],
        user: req._id,
    })
    res.status(200).json({
        status: "ok",
        communities,
    })
})
exports.getCommunities = bigPromise(async (req, res, next) => {
    const communities = await Communities.find()
    res.status(200).json({
        message: "ok",
        communities,
    })
})
