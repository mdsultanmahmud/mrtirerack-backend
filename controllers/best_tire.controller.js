const { getDb } = require("../utils/dbConnect")
const { ObjectId } = require('mongodb');
module.exports.getAllBestTires = async (req, res, next) => {
    const db = getDb()
    try {
        const response = await db.collection("Best_Tire")
            .find({})
            // .sort({ uploadDate: -1 })
            .toArray()
        const count = await db.collection("Best_Tire").count()
        console.log(count)
        res.status(200).send({ success: true, message: "Data are fethcing...", count, data: response })
    } catch (error) {
        next(error)
    }
}

module.exports.AddBestTire = async (req, res, next) => {
    const db = getDb()
    const tire = req.body
    console.log(db)
    try {
        const cursor = await db.collection("Best_Tire").insertOne(tire)
        if (!cursor.insertedId) {
            return res.status(400).send({ success: false, error: "something went wrong!!" })
        }
        res.status(200).send({ success: true, message: `tire added successfully with id ${cursor.insertedId}` })
    } catch (error) {
        next(error)
    }
}


// get a single items 

module.exports.getSingleTire = async (req, res, next) => {
    const id = req.params.id;
    try {
        const db = getDb();

        const response = await db.collection("Best_Tire")
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

module.exports.AddAComment = async (req, res, next) => {
    const db = getDb()
    const comment = req.body
    const id = req.params.id
    try {
        const result = await db.collection("Best_Tire").updateOne(
            { _id: new ObjectId(id) },
            { $push: { comments: comment } }
        );

        if (result.modifiedCount > 0) {
            res.status(200).send({ status: true, message: "Comment added successfully" });
        } else {
            res.status(404).send({ status: false, message: "Blog not found or comment not added" });
        }
    } catch (error) {
        next(error);
    }
}

module.exports.DeleteATire = async (req, res, next) => {
    const db = getDb();
    const id = req.params.id;
    try {
        const result = await db.collection("Best_Tire").deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount > 0) {
            res.status(200).send({ status: true, message: "Deleted successfully" });
        } else {
            res.status(404).send({ status: false, message: "Tire not found or delete operation failed" });
        }
    } catch (error) {
        next(error);
    }
};
