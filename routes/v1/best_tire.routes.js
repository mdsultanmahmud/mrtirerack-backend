const express = require("express")
const { AddBestTire, getAllBestTires, getSingleTire, AddAComment, DeleteATire } = require("../../controllers/best_tire.controller")
const router = express.Router()

router.route("/")
    .get(getAllBestTires)
    .post(AddBestTire)

router.route("/:id")
    .get(getSingleTire)
    .patch(AddAComment)
    .delete(DeleteATire)

module.exports = router 