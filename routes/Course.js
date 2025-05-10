// routes/Course.js
const express = require("express");
const CourseController = require("../controller/CourseController");

const router = express.Router();
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



// ip detector 
router.get('/courses-by-location', CourseController.getCourseByLocation);
// classrom
router.get('/classroom/courses', CourseController.fetchClassroomCourses);



// new onces 
router.post("/addLesson", CourseController.addLesson);
router.get("/getLessons/:courseId", CourseController.getLessonsByCourseId);






module.exports = router;