require("dotenv").config();
const ScoreQuiz = require("../models/ScoreQuiz"); // Path to your ScoreQuiz model
const User = require("../models/User");           // Path to your User model
const Question = require("../models/Question");  
const Quiz = require("../models/Quiz");

// Submit quiz score
async function submitQuiz(req, res) {
    try {
        const { quizId, userId } = req.params;
        const { userAnswers, isTimedOut = false } = req.body;

        if (!quizId.match(/^[0-9a-fA-F]{24}$/) || !userId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ status: "FAILED", message: "Invalid Quiz or User ID format" });
        }

        if (!userAnswers || typeof userAnswers !== "object") {
            return res.status(400).json({ status: "FAILED", message: "User answers are required" });
        }

        const quiz = await Quiz.findById(quizId);
        const user = await User.findById(userId);
        if (!quiz || !user) {
            return res.status(404).json({ status: "FAILED", message: "Quiz or User not found" });
        }

        // Calculate score (simplified; assumes service logic is in controller)
        const questions = await Question.find({ quiz: quizId });
        let totalScore = 0;
        for (const question of questions) {
            const userAnswer = userAnswers[question._id.toString()];
            if (userAnswer && userAnswer === question.correctAnswer) {
                totalScore += question.score;
            }
        }

        const scoreQuiz = new ScoreQuiz({
            quiz: quizId,
            user: userId,
            score: isTimedOut ? 0 : totalScore, // Zero if timed out
            isTimedOut
        });
        await scoreQuiz.save();

        // Add to quiz's scores array
        quiz.scores.push(scoreQuiz._id);
        await quiz.save();

        const populatedScore = await ScoreQuiz.findById(scoreQuiz._id).populate("quiz user");
        res.status(201).json({ status: "SUCCESS", message: "Quiz score submitted successfully", data: populatedScore });
    } catch (error) {
        console.error("Error submitting quiz:", error.message);
        res.status(400).json({ status: "FAILED", message: error.message });
    }
}

// Get score for user and quiz
async function getScoreForUserAndQuiz(req, res) {
    try {
        const { userId, quizId } = req.params;

        if (!userId.match(/^[0-9a-fA-F]{24}$/) || !quizId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ status: "FAILED", message: "Invalid User or Quiz ID format" });
        }

        const scoreQuiz = await ScoreQuiz.findOne({ user: userId, quiz: quizId }).populate("quiz user");
        if (!scoreQuiz) {
            return res.status(404).json({ status: "FAILED", message: "Score not found" });
        }
        res.status(200).json({ status: "SUCCESS", message: "Score retrieved successfully", data: scoreQuiz });
    } catch (error) {
        res.status(500).json({ status: "FAILED", message: error.message });
    }
}

// Get all quiz scores with additional data
async function getAllQuizScores(req, res) {
    try {
        const scores = await ScoreQuiz.find().populate("quiz user");
        if (!scores.length) {
            return res.status(204).json({ status: "SUCCESS", message: "No scores found", data: [] });
        }

        const result = await Promise.all(scores.map(async (scoreQuiz) => {
            const questions = await Question.find({ quiz: scoreQuiz.quiz._id });
            const maxScore = questions.reduce((sum, q) => sum + q.score, 0);

            return {
                idScoreQuiz: scoreQuiz._id,
                quizName: scoreQuiz.quiz.titre,
                userName: scoreQuiz.user.nom,
                score: scoreQuiz.score,
                maxScore,
                result: scoreQuiz.score > (maxScore / 2) ? "Pass" : "Fail"
            };
        }));

        res.status(200).json({ status: "SUCCESS", message: "Scores retrieved successfully", data: result });
    } catch (error) {
        res.status(500).json({ status: "FAILED", message: error.message });
    }
}

// Delete a quiz score
async function deleteScoreQuiz(req, res) {
    try {
        const { idScoreQuiz } = req.params;

        if (!idScoreQuiz.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ status: "FAILED", message: "Invalid ScoreQuiz ID format" });
        }

        const deletedScore = await ScoreQuiz.findByIdAndDelete(idScoreQuiz);
        if (!deletedScore) {
            return res.status(404).json({ status: "FAILED", message: "Score not found" });
        }

        // Remove from Quiz's scores array
        await Quiz.updateOne(
            { _id: deletedScore.quiz },
            { $pull: { scores: deletedScore._id } }
        );

        res.status(200).json({ status: "SUCCESS", message: "Score deleted successfully" });
    } catch (error) {
        console.error("Error deleting score:", error.message);
        res.status(500).json({ status: "FAILED", message: error.message });
    }
}

// Get distinct quiz names
async function getDistinctQuizNames(req, res) {
    try {
        const scores = await ScoreQuiz.find().populate("quiz").select("quiz");
        const quizNames = [...new Set(scores.map(score => score.quiz.titre))];
        if (!quizNames.length) {
            return res.status(204).json({ status: "SUCCESS", message: "No quiz names found", data: [] });
        }
        res.status(200).json({ status: "SUCCESS", message: "Quiz names retrieved successfully", data: quizNames });
    } catch (error) {
        res.status(500).json({ status: "FAILED", message: error.message });
    }
}

module.exports = {
    submitQuiz,
    getScoreForUserAndQuiz,
    getAllQuizScores,
    deleteScoreQuiz,
    getDistinctQuizNames
};