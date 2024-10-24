const express = require("express")
const router = express.Router()
const sellerController = require("../Controllers/sellerController")
const chekToken = require("../middlewer/authMiddlewer")



router.post("/registerSeller", sellerController.registerSeller)
router.post("/loginSeller", sellerController.loginSeller)
router.get("/getOrederseller", chekToken.verifyToken, sellerController.getOrderByIdSeller)

module.exports = router