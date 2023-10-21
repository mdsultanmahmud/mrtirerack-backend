const { ObjectId } = require("mongodb")
const { getDb } = require("../utils/dbConnect")

module.exports.getAllComments = async (req, res, next) => {
    const db = getDb()
    try {
        const comments = await db.collection("Comments").find({}).sort({ createdAt: -1 }).toArray()
        if (comments) {
            return res.status(200).send({ success: true, message: "We get all comments!", data: comments })
        } else {
            return res.status(404).send({ success: true, message: "There are no comments!" })
        }
    } catch (error) {
        next(error)
    }
}

module.exports.addAComment = async (req, res, next) => {
    const db = getDb()
    const comment = req.body
    try {
        const result = await db.collection("Comments").insertOne(comment)
        if (result.insertedId) {
            return res.status(200).send({ success: true, message: "Comment Added Successfully!!" })
        } else {
            return res.status(404).send({ success: true, message: "Comment is not added" })
        }

    }
    catch (error) {
        next(error)
    }
}

module.exports.getCommentWithBlogId = async (req, res, next) => {
    const db = getDb()
    const blogId = req.params.id
    console.log(blogId)
    try {
        const comments = await db.collection("Comments").find({ blogId }).toArray()
        if (comments) {
            return res.status(200).send({ success: true, message: "We get all comments for this blog!", data: comments })
        } else {
            return res.status(404).send({ success: true, message: "There are no comments for this blog!" })
        }
    } catch (error) {
        next(error)
    }
}
module.exports.deleteAComment = async (req, res, next) => {
    const db = getDb()
    const id = req.params.id
    try {
        const comments = await db.collection("Comments").deleteOne({
            _id: new ObjectId(id)
        })
        if (comments.deletedCount > 0) {
            return res.status(200).send({ success: true, message: "Comment Deleted Successfully!", data: comments })
        } else {
            return res.status(404).send({ success: true, message: "Comment is not Deleted!" })
        }
    } catch (error) {
        next(error)
    }
}

module.exports.editComment = async (req, res, next) => {
    const db = getDb()
    const id = req.params.id
    try {
        const result = await db.collection('Comments').updateOne(
            { _id: new ObjectId(id) },
            { $set: { status: true } }
        );

        if (result.matchedCount === 1) {
            return res.status(200).send({ success: true, message: "Comment Deleted Successfully!", data: result })
        } else {
            return res.status(404).send({ success: true, message: "Comment is not Deleted!" })
        }
    } catch (error) {
        next(error)
    }
}