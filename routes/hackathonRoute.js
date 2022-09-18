const express = require("express")
const {
    createHackathon,
    registerHackathon,
    joinHackathon,
    getallhackathon,
} = require("../controllers/hackathonController")

const { isLoggedIn } = require("../middlewares/userMiddleware")
const router = express.Router()

router.route("/createhackathon").post(isLoggedIn, createHackathon)
router.route("/registerhackathon").post(isLoggedIn, registerHackathon)
router.route("/joinhackathon").post(isLoggedIn, joinHackathon)
router.route("/getallhackathon").get(isLoggedIn, getallhackathon)

module.exports = router
