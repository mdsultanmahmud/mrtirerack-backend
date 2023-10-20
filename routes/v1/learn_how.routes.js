const express = require("express")
const { addBlog, getAllBlogs, getASingleBlog, deleteABlog } = require("../../controllers/learn_how.controller")
const router = express.Router()
router.route("/")
.get(getAllBlogs)
.post(addBlog)

router.route("/:id")
.get(getASingleBlog)
.delete(deleteABlog)

module.exports = router 