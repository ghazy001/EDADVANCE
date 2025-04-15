const express = require("express");
const router = express.Router();
const {
    submitQuiz,
    getScoreForUserAndQuiz,
    getAllQuizScores,
    deleteScoreQuiz,
    getDistinctQuizNames
} = require("../controller/ScoreQuizController"); // Path to your controller

router.use(express.json());

router.post("/submit/:quizId/:userId", submitQuiz);
router.get("/user/:userId/quiz/:quizId", getScoreForUserAndQuiz);
router.get("/all", getAllQuizScores);
router.delete("/:idScoreQuiz", deleteScoreQuiz);
router.get("/quizNames", getDistinctQuizNames);

module.exports = router;