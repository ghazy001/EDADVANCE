const express = require("express");
const router = express.Router();
const {
    getAllQuestions,
    getQuestionById,
    getQuestionsByQuizId,
    updateQuestion,
    deleteQuestion,
    addQuestionToQuiz
} = require("../controller/QuestionController"); // Path to your controller

router.use(express.json());
router.post("/addQuestions/:quizId", addQuestionToQuiz);

router.get("/getAllQuestions", getAllQuestions);
router.get("/:id", getQuestionById);
router.get("/quiz/:quizId", getQuestionsByQuizId);
router.put("/update/:id", updateQuestion);
router.delete("/delete/:id", deleteQuestion);


module.exports = router;