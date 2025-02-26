const express = require('express');
const router = express.Router();
const quizController = require('../controller/QuizController');

router.post('/add', quizController.add);
router.get('/', quizController.getAll);
router.get('/:id', quizController.getById);
router.put('/update/:id', quizController.update);
router.delete('/delete/:id', quizController.deleteQuiz);
router.delete('/delete', quizController.deleteAll);

module.exports = router;
