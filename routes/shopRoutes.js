const express = require("express")
const router = express.Router()
const shopController = require("../Controllers/shopController")
const buyerToken = require("../middlewer/authMiddlewer")

// router.use(express.json())
// router.use(express.urlencoded({ extended: true }));
router.post("/registerShop", shopController.registerShop)
// router.post("/registerOrder", buyerToken.verifyToken,shopController.createOrder)


module.exports = router