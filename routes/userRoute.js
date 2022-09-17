const express = require("express")
const {
    userSignUp,
    userLogin,
    userChanges,
    followers,
} = require("../controllers/userController")
const { isLoggedIn } = require("../middlewares/userMiddleware")
const router = express.Router()

router.route("/signup").post(userSignUp)
router.route("/login").post(userLogin)
router.route("/userchange").post(isLoggedIn, userChanges)
router.route("/follow").post(isLoggedIn, followers)
module.exports = router
