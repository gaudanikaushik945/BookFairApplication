const express = require("express")
const router = express.Router()
const orderController = require("../Controllers/orderController")
const chekToken = require("../middlewer/authMiddlewer")


router.post("/registerOrder", chekToken.verifyToken, orderController.createOrder)
router.put("/orderCancletion/:books_id", chekToken.verifyToken, orderController.cancleOrder)
router.get("/ordersPagination", orderController.getOrdersPagination)
router.get("/transtionUser", orderController.transtionUserUnmanage)
router.get("/transtionUserManage", orderController.transtionUserManage)
// router.post("/orderStatus", jwtToken.verifyToken, orderController.orderStatus)


module.exports = router 