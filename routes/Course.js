// routes/Course.js
const express = require("express");
const cors = require("cors");
const CourseController = require("../controller/CourseController");

const router = express.Router();
router.use(cors());
router.use(express.json());

// CRUD Routes
router.post("/add", CourseController.add);
router.get("/getAll", CourseController.getAll);
router.get("/getCourse/:id", CourseController.getById);
router.put("/update/:id", CourseController.update);
router.delete("/delete/:id", CourseController.deleteCourse);

// Checkout Routes
router.post("/checkout", CourseController.createCheckout);
router.get("/complete", CourseController.completePayment);
router.get("/cancel", CourseController.cancelPayment);

module.exports = router;