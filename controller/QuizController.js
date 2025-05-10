const mongoose = require("mongoose");
require("dotenv").config();
const Quiz = require("../models/Quiz");
const Course = require("../models/Course");
const User = require("../models/User"); 

async function addQuiz(req, res) {
  try {
    if (!req.params.idCours.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ status: "FAILED", message: "Invalid Course ID format" });
    }

    let { titre, description } = req.body;
    titre = titre?.trim();
    description = description?.trim();

    if (!titre) {
      return res.status(400).json({ status: "FAILED", message: "Quiz title is required" });
    }

    const course = await Course.findById(req.params.idCours);
    if (!course) {
      return res.status(404).json({ status: "FAILED", message: "Course not found" });
    }

    const newQuiz = new Quiz({
      titre,
      description,
      cours: req.params.idCours
    });
    await newQuiz.save();

    const populatedQuiz = await Quiz.findById(newQuiz._id).populate("cours");
    res.status(201).json({ status: "SUCCESS", message: "Quiz added successfully", data: populatedQuiz });
  } catch (error) {
    res.status(500).json({ status: "FAILED", message: error.message });
  }
}
async function getAllQuizzes(req, res) {
    try {
        const quizzes = await Quiz.find().populate("cours questions scores");
        res.status(200).json({ status: "SUCCESS", message: "Quizzes retrieved successfully", data: quizzes });
    } catch (error) {
        res.status(500).json({ status: "FAILED", message: error.message });
    }
}

  async function getQuizById(req, res) {
    try {
      const quizId = req.params.id;
      console.log(`Attempting to fetch quiz with ID: ${quizId}`);

      if (!quizId.match(/^[0-9a-fA-F]{24}$/)) {
        console.log(`Invalid ID format: ${quizId}`);
        return res.status(400).json({ status: "FAILED", message: "Invalid Quiz ID format" });
      }

      const quiz = await Quiz.findById(quizId).populate([
        { path: "cours" },
        { path: "scores" },
        {
          path: "questions",
          populate: {
            path: "reponses", // assuming each Question has an array of Reponse IDs
          },
        },
      ]);

      if (!quiz) {
        console.log(`Quiz not found in database for ID: ${quizId}`);
        return res.status(404).json({ status: "FAILED", message: "Quiz not found" });
      }

      console.log(`Fetched quiz successfully:`, quiz);
      res.status(200).json({ status: "SUCCESS", message: "Quiz retrieved successfully", data: quiz });
    } catch (error) {
      console.error(`Error fetching quiz: ${error.message}`, error);
      res.status(500).json({ status: "FAILED", message: error.message });
    }
  }

async function getQuizzesByCourse(req, res) {
  try {
    if (!req.params.idCours.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ status: "FAILED", message: "Invalid Course ID format" });
    }
    const quiz = await Quiz.find({
      $or: [
        { cours: req.params.idCours },
        { coursId: req.params.idCours }
      ]
    }).populate("cours questions scores");
    res.status(200).json({ status: "SUCCESS", message: "Quiz retrieved successfully", data: quiz
     });
  } catch (error) {
    res.status(500).json({ status: "FAILED", message: error.message });
  }
}
async function updateQuiz(req, res) {
    try {
        if (!req.params.idQuiz.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ status: "FAILED", message: "Invalid Quiz ID format" });
        }

        let { titre, description, course } = req.body;
        titre = titre?.trim();
        description = description?.trim();
        course = course?.trim();

        const updatedQuiz = await Quiz.findByIdAndUpdate(
            req.params.idQuiz,
            { titre, description, cours: course },
            { new: true, runValidators: true }
        ).populate("cours questions scores");

        if (!updatedQuiz) {
            return res.status(404).json({ status: "FAILED", message: "Quiz not found" });
        }
        res.status(200).json({ status: "SUCCESS", message: "Quiz updated successfully", data: updatedQuiz });
    } catch (error) {
        res.status(400).json({ status: "FAILED", message: error.message });
    }
}

async function deleteQuiz(req, res) {
    try {
        if (!req.params.idQuiz.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ status: "FAILED", message: "Invalid Quiz ID format" });
        }
        const deletedQuiz = await Quiz.findByIdAndDelete(req.params.idQuiz);
        if (!deletedQuiz) {
            return res.status(404).json({ status: "FAILED", message: "Quiz not found" });
        }
        res.status(200).json({ status: "SUCCESS", message: "Quiz deleted successfully" });
    } catch (error) {
        res.status(500).json({ status: "FAILED", message: error.message });
    }
}
// Submit quiz answers
async function submitQuiz(req, res) {
  try {
    const { quizId, userId } = req.params;
    const { userAnswers, isTimedOut } = req.body;

    // Validate quizId
    if (!mongoose.Types.ObjectId.isValid(quizId)) {
      return res.status(400).json({ status: "FAILED", message: "Invalid quiz ID format" });
    }

    // Convert userId to ObjectId using 'new' keyword
    const validUserId = mongoose.Types.ObjectId.isValid(userId) ? new mongoose.Types.ObjectId(userId) : userId;

    // Fetch quiz with fully populated questions and responses
    const quiz = await Quiz.findById(quizId).populate({
      path: "questions",
      populate: {
        path: "reponses",
        select: "texte" // Make sure to get the answer text
      }
    });

    if (!quiz) {
      return res.status(404).json({ status: "FAILED", message: "Quiz not found" });
    }

    // Validate userAnswers count
    if (!userAnswers || Object.keys(userAnswers).length !== quiz.questions.length) {
      return res.status(400).json({ status: "FAILED", message: "Missing answers for some questions" });
    }

    let totalScore = 0;
    const answerDetails = [];

    for (const question of quiz.questions) {
      const questionIdStr = question._id.toString();
      const submittedAnswerId = userAnswers[questionIdStr];

      if (!submittedAnswerId || !mongoose.Types.ObjectId.isValid(submittedAnswerId)) {
        continue;
      }

      // Find the submitted answer text
      const submittedAnswer = question.reponses.find(r => r._id.toString() === submittedAnswerId);
      if (!submittedAnswer) {
        continue; // If no matching answer found, skip
      }

      // Correct comparison: compare the answer text, not the ID
      const isCorrect = String(submittedAnswer.texte) === String(question.correctAnswer);

      if (isCorrect) {
        totalScore += question.score || 0;
      }

      answerDetails.push({
        questionId: question._id,
        submittedAnswerId,
        isCorrect
      });
    }

    // Save quiz result
    quiz.scores.push({
      userId: validUserId,
      score: totalScore,
      submittedAt: new Date(),
      isTimedOut
    });

    await quiz.save();

    // Update user's totalScore
    await User.findByIdAndUpdate(
      validUserId,
      { $inc: { totalScore: totalScore } }, // Increment totalScore by the quiz score
      { new: true }
    );

    res.status(200).json({
      status: "SUCCESS",
      message: "Quiz submitted successfully",
      data: {
        score: totalScore,
        totalQuestions: quiz.questions.length,
        correctAnswers: answerDetails.filter(a => a.isCorrect).length,
        details: answerDetails
      }
    });
  } catch (error) {
    console.error("Quiz submission error:", error);
    res.status(500).json({ status: "FAILED", message: "Internal server error" });
  }
}

module.exports = {
    addQuiz,
    getAllQuizzes,
    getQuizById,
    getQuizzesByCourse,
    updateQuiz,submitQuiz,
    deleteQuiz
};