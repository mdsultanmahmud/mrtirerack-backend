const { ObjectId } = require("mongodb")
const { getDb } = require("../utils/dbConnect")

// get all data 
module.exports.getAllBlogs = async (req, res, next) => {
    const db = getDb()
    try {
        const response = await db.collection("LearnHowBlog")
            .find({})
            .toArray()
        const count = await db.collection("LearnHowBlog").count()
        res.status(200).send({ success: true, message: "Data are fethcing...", count, data: response })
    } catch (error) {
        next(error)
    }
}

// add a blog 
module.exports.addBlog = async (req, res, next) => {
    const db = getDb()
    const blog = req.body
    try {
        const cursor = await db.collection("LearnHowBlog").insertOne(blog)
        if (!cursor.insertedId) {
            return res.status(400).send({ success: false, error: "something went wrong!!" })
        }
        res.status(200).send({ success: true, message: `tire added successfully with id ${cursor.insertedId}` })
    } catch (error) {
        next(error)
    }

}

// get a single data 
module.exports.getASingleBlog = async (req, res, next) => {
    const id = req.params.id;
    try {
        const db = getDb();
        const response = await db.collection("LearnHowBlog")
            .findOne({ _id: new ObjectId(id) });
        if (response) {
            res.status(200).send({ success: true, message: "Data retrieved successfully", data: response });
        } else {
            res.status(404).send({ success: false, message: "Data not found" });
        }
    } catch (error) {
        next(error);
    }
};

//delete a blog 
module.exports.deleteABlog = async (req, res, next) => {
    const db = getDb();
    const id = req.params.id;
    try {
        const result = await db.collection("LearnHowBlog").deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount > 0) {
            res.status(200).send({ status: true, message: "Deleted successfully",data: result });
        } else {
            res.status(404).send({ status: false, message: "Tire not found or delete operation failed" });
        }
    } catch (error) {
        next(error);
    }
};
