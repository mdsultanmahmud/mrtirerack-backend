const express = require("express")
const { AddBestTire } = require("../../controllers/best_tire.controller")
const router = express.Router()

router.route("/")
.post(AddBestTire)



module.exports = router 