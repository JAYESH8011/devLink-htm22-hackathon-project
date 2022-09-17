const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    description: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
    ],
})
module.exports = mongoose.model("Post", postSchema)
