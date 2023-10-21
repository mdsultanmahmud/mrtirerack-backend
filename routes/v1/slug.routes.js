const express = require("express")
const { route } = require("./best_tire.routes")
const { getDataForSlugURL } = require("../../controllers/slug.controller")
const router = express.Router()
router.route("/")
    .get(getDataForSlugURL)
module.exports = router 