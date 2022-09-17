const express = require("express")
require("./config/conn").connect()
const app = express()
const morgan = require("morgan")
const cookieParser = require("cookie-parser")
const fileUpload = require("express-fileupload")
const homeRoute = require("./routes/homeRoute")
const userRoute = require("./routes/userRoute")
const postRoute = require("./routes/postRoute")
const communitiesRoute = require("./routes/CommunitiesRoute")
const { errorHandler } = require("./middlewares/errorHandler")

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
    })
)

app.use(morgan("tiny"))

app.use("/", homeRoute)

app.use("/", userRoute)

app.use("/", postRoute)

app.use("/", communitiesRoute)

app.use(errorHandler)

module.exports = app
