const express = require("express")
const router = express.Router()
const upload = require("../middlewer/multerMiddlewer")

const bookController = require("../Controllers/bookController")
const chekToken = require("../middlewer/authMiddlewer")




router.post("/createBook", upload.single("bookimage"),bookController.registerBooks)
router.get("/getAllBooks", bookController.getAllBooks)
router.put("/stockUpdateById", bookController.updateBookStock)
router.get("/bookByIdBuyer/:id",chekToken.verifyToken,bookController.getBooksByIdBuyer)




module.exports = router
