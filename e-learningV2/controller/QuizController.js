const mongoose = require("mongoose");
require("dotenv").config();
const Quiz = require("../models/Quiz");
const Course = require("../models/Course");

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

    const quiz = await Quiz.findById(quizId).populate({
      path: "cours scores questions",
      populate: { path: "reponses" },
    });

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
    const quizzes = await Quiz.find({ cours: req.params.idCours }).populate("cours questions scores");
    res.status(200).json({ status: "SUCCESS", "message": "Quizzes retrieved successfully", data: quizzes });
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
  
      console.log("Received quiz submission:", { quizId, userId, userAnswers, isTimedOut });
  
      // Validate quizId and userId
      if (!mongoose.Types.ObjectId.isValid(quizId)) {
        console.log("Invalid quizId format:", quizId);
        return res.status(400).json({ status: "FAILED", message: "Invalid quiz ID format" });
      }
  
      if (!userId) {
        console.log("User ID is missing");
        return res.status(400).json({ status: "FAILED", message: "User ID is required" });
      }
  
      // Find the quiz
      console.log("Querying quiz with ID:", quizId);
      const quiz = await Quiz.findById(quizId).populate({
        path: "questions",
        populate: { path: "reponses" },
      });
  
      console.log("Found quiz:", quiz);
  
      if (!quiz) {
        return res.status(404).json({ status: "FAILED", message: "Quiz not found" });
      }
  
      // Calculate the score
      console.log("Calculating score for questions:", quiz.questions);
      let totalScore = 0;
      for (const question of quiz.questions) {
        const userAnswer = userAnswers[question._id];
        console.log(`Question ${question._id}: userAnswer=${userAnswer}, correctAnswer=${question.correctAnswer}`);
        if (userAnswer && userAnswer === question.correctAnswer) {
          totalScore += question.score || 0;
        }
      }
  
      // Store the score in the quiz's scores array
      const scoreEntry = {
        userId,
        score: totalScore,
        submittedAt: new Date(),
        isTimedOut,
      };
      console.log("Adding score entry:", scoreEntry);
      quiz.scores.push(scoreEntry);
  
      console.log("Saving quiz with new score...");
      await quiz.save();
  
      res.status(200).json({
        status: "SUCCESS",
        message: "Quiz submitted successfully",
        data: { score: totalScore },
      });
    } catch (error) {
      console.error("Error submitting quiz:", error);
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