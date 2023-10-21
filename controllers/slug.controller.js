const { getDb } = require("../utils/dbConnect")

module.exports.getDataForSlugURL = async (req, res, next) => {
    const slugUrl = req.query.slugurl
    try {
        const db = getDb()
        const result = await db.collection("Best_Tire").findOne({
            mainHeading: `${slugUrl}`
        })
        if (!result) {
            res.status(404).send({ success: false, message: "Data is not found" })
        } else {
            res.status(200).send({ success: false, message: "Data is found", data: result })
        }
    } catch (error) {
        next(error)
    }
}