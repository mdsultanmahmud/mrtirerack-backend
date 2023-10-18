const express = require("express")
const { AddBestTire, getAllBestTires, getSingleTire } = require("../../controllers/best_tire.controller")
const router = express.Router()

router.route("/")
    .get(getAllBestTires)
    .post(AddBestTire)

router.route("/:id")
    .get(getSingleTire)


module.exports = router 