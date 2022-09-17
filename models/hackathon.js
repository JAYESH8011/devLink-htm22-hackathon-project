const mongoose = require("mongoose")

const hackathonSchema = mongoose.Schema({
    name: {
        type: String,
    },
    shortDescription: {
        type: String,
    },
    longDescription: {
        type: String,
    },
    deadline: {
        type: Date,
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
    maxTeamSize: {
        type: Number,
    },
    maxParticipant: {
        type: Number,
    },
})
module.exports = mongoose.model("Hackathon", hackathonSchema)
