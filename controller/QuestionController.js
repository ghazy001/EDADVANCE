    const mongoose = require("mongoose");
    require("dotenv").config();
    const Question = require("../models/Question"); // Path to your Question model
    const Quiz = require("../models/Quiz");         // Path to your Quiz model

    // Get all questions
    async function getAllQuestions(req, res) {
        try {
            const questions = await Question.find().populate("quiz reponses");
            res.status(200).json({ status: "SUCCESS", message: "Questions retrieved successfully", data: questions });
        } catch (error) {
            res.status(500).json({ status: "FAILED", message: error.message });
        }
    }

    async function getQuestionById(req, res) {
        try {
        const questionId = req.params.id;
    
        if (!questionId) {
            return res.status(400).json({ status: "FAILED", message: "Question ID is required" });
        }
    
        if (!mongoose.Types.ObjectId.isValid(questionId)) {
            return res.status(400).json({ status: "FAILED", message: "Invalid question ID format" });
        }
    
        const question = await Question.findOne({ _id: new mongoose.Types.ObjectId(questionId) }).populate(
            "quiz reponses"
        );
    
        if (!question) {
            return res.status(404).json({ status: "FAILED", message: "Question not found" });
        }
    
        res.json({ status: "SUCCESS", message: "Question retrieved successfully", data: question });
        } catch (error) {
        console.error("Error fetching question:", error);
        res.status(500).json({ status: "FAILED", message: "Internal server error" });
        }
    }

    // Update a question
    async function updateQuestion(req, res) {
        try {
            if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
                return res.status(400).json({ status: "FAILED", message: "Invalid Question ID format" });
            }

            let { contenu, score, correctAnswer, quiz } = req.body;
            contenu = contenu?.trim();
            score = score ? parseInt(score) : undefined;
            correctAnswer = correctAnswer?.trim();
            quiz = quiz?.trim();

            if (score < 0) {
                return res.status(400).json({ status: "FAILED", message: "Score cannot be negative" });
            }

            const updatedQuestion = await Question.findByIdAndUpdate(
                req.params.id,
                { contenu, score, correctAnswer, quiz },
                { new: true, runValidators: true }
            ).populate("quiz reponses");

            if (!updatedQuestion) {
                return res.status(404).json({ status: "FAILED", message: "Question not found" });
            }
            res.status(200).json({ status: "SUCCESS", message: "Question updated successfully", data: updatedQuestion });
        } catch (error) {
            res.status(400).json({ status: "FAILED", message: error.message });
        }
    }

    // Delete a question
    async function deleteQuestion(req, res) {
        try {
            if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
                return res.status(400).json({ status: "FAILED", message: "Invalid Question ID format" });
            }
            const deletedQuestion = await Question.findByIdAndDelete(req.params.id);
            if (!deletedQuestion) {
                return res.status(404).json({ status: "FAILED", message: "Question not found" });
            }

            // Remove from Quiz's questions array
            await Quiz.updateOne(
                { _id: deletedQuestion.quiz },
                { $pull: { questions: deletedQuestion._id } }
            );

            res.status(200).json({ status: "SUCCESS", message: "Question deleted successfully" });
        } catch (error) {
            res.status(500).json({ status: "FAILED", message: error.message });
        }
    }

    // Add a question to a quiz
    async function addQuestionToQuiz(req, res) {
        try {
        // Validate the quizId format using Mongoose's built-in method
        const { quizId } = req.params;
        console.log('Received quizId:', quizId); // Already logging the quizId
        console.log('QuizId length:', quizId.length); // Check length of quizId

        if (!quizId.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ status: "FAILED", message: "Invalid Quiz ID format" });
        }
        if (!mongoose.Types.ObjectId.isValid(quizId)) {
            return res.status(400).json({ status: "FAILED", message: "Invalid Quiz ID format" });
        }
    
        // Destructure and trim the inputs from the request body
        let { contenu, score, correctAnswer } = req.body;
        contenu = contenu?.trim();
        score = score ? parseInt(score, 10) : undefined;
        correctAnswer = correctAnswer?.trim();
    
        // Validate required fields
        if (!contenu || score === undefined || !correctAnswer) {
            return res.status(400).json({ status: "FAILED", message: "Required input fields are missing or empty!" });
        }
        
        // Ensure the score is not negative
        if (score < 0) {
            return res.status(400).json({ status: "FAILED", message: "Score cannot be negative" });
        }
    
        // Find the quiz to which the question will be added
        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return res.status(404).json({ status: "FAILED", message: "Quiz not found" });
        }
    
        // Create a new question and associate it with the quiz
        const newQuestion = new Question({
            contenu,
            score,
            correctAnswer,
            quiz: quizId
        });
        await newQuestion.save();
    
        // Add the new question's ID to the quiz's questions array
        quiz.questions.push(newQuestion._id);
        await quiz.save();
    
        // Populate the newly created question to get related fields
        const populatedQuestion = await Question.findById(newQuestion._id).populate("quiz reponses");
    
        // Send success response
        res.status(201).json({
            status: "SUCCESS",
            message: "Question added successfully",
            data: populatedQuestion
        });
    
        } catch (error) {
        res.status(500).json({ status: "FAILED", message: error.message });
        }
    }
    
    async function getQuestionsByQuizId(req, res) {

      
        try {
            const { quizId } = req.params;
    
            if (!mongoose.Types.ObjectId.isValid(quizId)) {
                return res.status(400).json({ status: "FAILED", message: "Invalid Quiz ID format" });
            }
    
            const quiz = await Quiz.findById(quizId)
                .populate({
                    path: "questions",
                    populate: { path: "reponses" }
                })
                .populate("cours");

                

    
            if (!quiz) {
                return res.status(404).json({ status: "FAILED", message: "Quiz not found" });
            }

    
            res.status(200).json({
                status: "SUCCESS",
                message: "Quiz retrieved successfully",
                data: quiz
            });
        } catch (error) {
            res.status(500).json({ status: "FAILED", message: error.message });
        }


    }
    
    
    module.exports = {
        getAllQuestions,
        getQuestionById,
        getQuestionsByQuizId,
        updateQuestion,
        deleteQuestion,
        addQuestionToQuiz
    };