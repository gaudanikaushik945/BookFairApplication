const express = require("express")
const router = express.Router()
const buyerController = require("../Controllers/buyerController")
const chekToken = require("../middlewer/authMiddlewer")



router.post("/registerBuyer", buyerController.registerBuyer)
router.post("/loginBuyer", buyerController.loginBuyer)
router.get("/getOrderById", chekToken.verifyToken, buyerController.getOrderByIdBuyer)
router.post("/forgetPassword", buyerController.forgetPasswordBuyer)
router.get("/resetPassoerd", chekToken.verifyToken,buyerController.resetPassword)

module.exports = router 