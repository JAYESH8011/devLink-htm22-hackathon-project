const bigPromise = require("../middlewares/bigPromise")

exports.homeController = bigPromise((req, res, next) => {
    res.send("<h1>WORK IN PROGRESS</h1>")
})
