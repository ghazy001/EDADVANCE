const express = require("express");
const router = express.Router();
const {
  addQuiz,
  getAllQuizzes,
  getQuizById,
  getQuizzesByCourse,
  updateQuiz,
  submitQuiz,
  deleteQuiz
} = require("../controller/QuizController");

router.use(express.json());

router.post("/add/:idCours", addQuiz);
router.get("/getAll", getAllQuizzes);
router.get("/:id", getQuizById);
router.get("/byCourse/:idCours", getQuizzesByCourse);
router.put("/update/:idQuiz", updateQuiz);
router.delete("/delete/:idQuiz", deleteQuiz);
router.post("/:quizId/user/:userId/submit", submitQuiz);

module.exports = router;