const mongoose = require("mongoose")

const joinedHackathonSchema = mongoose.Schema({
    hackId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "hackathon",
    },
    teamName: {
        type: String,
    },
    teamLeaderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    team: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
    ],
})

module.exports = mongoose.model("joinedhackathon", joinedHackathonSchema)
