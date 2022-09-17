class CustomError extends Error {
    constructor(message, code) {
        super(message)
        this.code = code || 500
    }
    display(req, res) {
        res.status(this.code).json({
            status: "error",
            message: this.message,
            errorCode: this.code,
        })
    }
}
module.exports = CustomError
