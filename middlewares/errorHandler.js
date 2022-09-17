exports.errorHandler = (error, req, res, next) => {
    console.log(error.name)
    console.log(error.stack)
    if (error.name === "MongoServerError" && error.code === 11000) {
        res.status(400).json({
            status: "error",
            message: "duplicate email user already exist",
            code: 400,
        })
    } else if (error.display === undefined) {
        res.status(500).json({
            status: "error",
            message: error.message,
            code: 500,
        })
    } else {
        error.display(req, res)
    }
}
