const mongoose = require("mongoose")
exports.connect = () => {
    mongoose
        .connect(process.env.MONGO_URI)
        .then(() => {
            console.log("DB CONNECTED")
        })
        .catch((err) => {
            console.log("DB NOT CONNECTED")
        })
}
