const jwt = require("jsonwebtoken")
const User = require("../models/User")
const CustomError = require("../utils/customError")
const bigPromise = require("./bigPromise")

exports.isLoggedIn = bigPromise((req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return next(new CustonError("session has expired", 400))
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if (!decoded) {
        return next(new CustonError("token has expired", 400))
    }
    req._id = decoded.id
    next()
})
