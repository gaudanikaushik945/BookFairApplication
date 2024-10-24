const express = require("express")
const router = express.Router()
const courseController = require("../controller/course.controller")
const tokenVerify = require("../middleware/authMiddleware")

 


router.post("/create/course",courseController.createCourse)
router.get("/get/course",tokenVerify.verifyToken,courseController.getCourse)
router.get("/getAll", tokenVerify.verifyToken,courseController.getAllCourse)
router.get("/getCourseId/:id", tokenVerify.verifyToken,courseController.getCourseId)
router.put("/putCourseId/:id", tokenVerify.verifyToken,courseController.updateByCourseId)
router.delete("/deleteCourseId/:id", tokenVerify.verifyToken,courseController.deleteByCourseId)


module.exports = router
