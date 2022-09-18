const bigPromise = require("../middlewares/bigPromise")
const CustomError = require("../utils/customError")
const Hackathon = require("../models/hackathon")
const lighthouse = require("@lighthouse-web3/sdk")
const JoinedHacakthon = require("../models/JoinedHackathon")

exports.createHackathon = bigPromise(async (req, res, next) => {
    const {
        name,
        shortDescription,
        longDescription,
        deadline,
        maxTeamSize,
        maxParticipant,
    } = req.body
    if (
        !name ||
        !shortDescription ||
        !longDescription ||
        !deadline ||
        !maxTeamSize ||
        !maxParticipant
    )
        return next(new CustomError("all fields are required", 400))
    if (!req.files) return next(new CustomError("all photos are required", 400))
    const { coverPhoto, photo } = req.files
    const coverResponse = await lighthouse.deploy(
        coverPhoto.tempFilePath,
        process.env.API_KEY
    )
    const photoResponse = await lighthouse.deploy(
        photo.tempFilePath,
        process.env.API_KEY
    )
    const hackathon = await Hackathon.create({
        name,
        shortDescription,
        longDescription,
        deadline,
        maxTeamSize,
        maxParticipant,
        photo: {
            hash: coverResponse.data.Hash,
            securedurl: `https://ipfs.io/ipfs/${response.data.Hash}`,
        },
        coverPhoto: {
            hash: photoResponse.data.Hash,
            securedurl: `https://ipfs.io/ipfs/${response.data.Hash}`,
        },
    })
    res.status(201).json({
        status: "ok",
        hackathon,
    })
})
exports.registerHackathon = bigPromise(async (req, res, next) => {
    const { hackId } = req.body
    const { teamName } = req.body
    const hackathon = await Hackathon.findById(hackId)
    if (!hackathon) return next(new CustomError("hackathon not found", 400))
    if (hackathon.totalParticipant >= hackathon.maxParticipant)
        return next(new CustomError("hackathon full", 400))
    const joinedHacakthon = await JoinedHacakthon.create({
        hackId,
        teamName,
        teamLeaderId: req._id,
    })
    res.status(200).json({
        status: "ok",
        message: "registed",
    })
})
exports.joinHackathon = bigPromise(async (req, res, next) => {
    const { joinedHacakthonId } = req.body
    const joinedHacakthon = await JoinedHackathon.findById(joinedHacakthonId)
    if(joinedHacakthon.teamLeaderId === req._id)
})
