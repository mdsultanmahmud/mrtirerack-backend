const express = require("express")
const { addAComment, getCommentWithBlogId, getAllComments, deleteAComment, editComment } = require("../../controllers/comments.controller")
const router = express.Router()

router.route("/")
    .get(getAllComments)
    .post(addAComment)


router.route("/:id")
    .get(getCommentWithBlogId)
    .delete(deleteAComment)
    .patch(editComment)
module.exports = router 
