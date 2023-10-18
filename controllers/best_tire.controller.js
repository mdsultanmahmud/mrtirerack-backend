const { getDb } = require("../utils/dbConnect")
const { ObjectId } = require('mongodb'); 

const tools = [
    { id: 1, name: 'electroon.js' },
    { id: 2, name: 'node.js' },
    { id: 3, name: 'react.js' },
    { id: 4, name: 'express.js' },
    { id: 5, name: 'python' },
    { id: 6, name: 'java' },
    { id: 7, name: 'javacript' },
    { id: 8, name: 'C' }
]

module.exports.getAllBestTires = async (req, res, next) => {
    const db = getDb()
    try {
        const response = await db.collection("Best_Tire")
            .find({})
            // .sort({ uploadDate: -1 })
            .toArray()
        res.status(200).send({ success: true, message: "Data are fethcing...", data: response })
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
