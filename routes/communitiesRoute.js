const express = require("express")
const {
    joinCommunities,
    leaveCommunities,
    createCommunities,
    getCommunities,
} = require("../controllers/communitiesController")
const { isLoggedIn } = require("../middlewares/userMiddleware")
const router = express.Router()

router.route("/joincommunity").post(isLoggedIn, joinCommunities)
router.route("/leavecommunity").post(isLoggedIn, leaveCommunities)
router.route("/createcommunity").post(isLoggedIn, createCommunities)
router.route("/getallcommunities").get(isLoggedIn, getCommunities)

module.exports = router
