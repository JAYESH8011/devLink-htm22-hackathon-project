const express = require("express")
const {
    createPost,
    deletePost,
    likePost,
    allPost,
} = require("../controllers/postController")
const { isLoggedIn } = require("../middlewares/userMiddleware")
const router = express.Router()

router.route("/create").post(isLoggedIn, createPost)
router.route("/delete").delete(isLoggedIn, deletePost)
router.route("/likepost").post(isLoggedIn, likePost)
router.route("/allpost").get(allPost)

module.exports = router
