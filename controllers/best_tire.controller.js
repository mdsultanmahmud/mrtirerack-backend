const { getDb } = require("../utils/dbConnect")

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

module.exports.AddBestTire = async(req, res, next) =>{
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