const mongoose = require("mongoose")

const communitiesSchema = mongoose.Schema({
    name: {
        type: String,
    },
    interest: [
        {
            type: String,
        },
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    joinedUser: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
    ],
    post: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "post",
        },
    ],
})

module.exports = mongoose.model("communities", communitiesSchema)
