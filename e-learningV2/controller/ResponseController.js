require("dotenv").config();
const Reponse = require("../models/Response");   // Path to your Reponse model
const Question = require("../models/Question"); // Path to your Question model

// Add a response to a question
async function addReponseToQuestion(req, res) {
    try {
        if (!req.params.questionId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ status: "FAILED", message: "Invalid Question ID format" });
        }

        let { texte } = req.body;
        texte = texte?.trim();

        if (!texte) {
            return res.status(400).json({ status: "FAILED", message: "Response text is required" });
        }

        const question = await Question.findById(req.params.questionId);
        if (!question) {
            return res.status(404).json({ status: "FAILED", message: "Question not found" });
        }

        const newReponse = new Reponse({
            question: req.params.questionId,
            texte
        });
        await newReponse.save();

        // Add to question's reponses array
        question.reponses.push(newReponse._id);
        await question.save();

        const populatedReponse = await Reponse.findById(newReponse._id).populate("question");
        res.status(201).json({ status: "SUCCESS", message: "Response added successfully", data: populatedReponse });
    } catch (error) {
        res.status(500).json({ status: "FAILED", message: error.message });
    }
}

// Get all responses
async function getAllReponses(req, res) {
    try {
        const reponses = await Reponse.find().populate("question");
        res.status(200).json({ status: "SUCCESS", message: "Responses retrieved successfully", data: reponses });
    } catch (error) {
        res.status(500).json({ status: "FAILED", message: error.message });
    }
}

// Get response by ID
async function getReponseById(req, res) {
    try {
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ status: "FAILED", message: "Invalid Response ID format" });
        }
        const reponse = await Reponse.findById(req.params.id).populate("question");
        if (!reponse) {
            return res.status(404).json({ status: "FAILED", message: "Response not found" });
        }
        res.status(200).json({ status: "SUCCESS", message: "Response retrieved successfully", data: reponse });
    } catch (error) {
        res.status(500).json({ status: "FAILED", message: error.message });
    }
}

// Update a response
async function updateReponse(req, res) {
    try {
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ status: "FAILED", message: "Invalid Response ID format" });
        }

        let { texte, question } = req.body;
        texte = texte?.trim();
        question = question?.trim();

        const updatedReponse = await Reponse.findByIdAndUpdate(
            req.params.id,
            { texte, question },
            { new: true, runValidators: true }
        ).populate("question");

        if (!updatedReponse) {
            return res.status(404).json({ status: "FAILED", message: "Response not found" });
        }
        res.status(200).json({ status: "SUCCESS", message: "Response updated successfully", data: updatedReponse });
    } catch (error) {
        res.status(400).json({ status: "FAILED", message: error.message });
    }
}

// Delete a response
async function deleteReponse(req, res) {
    try {
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ status: "FAILED", message: "Invalid Response ID format" });
        }
        const deletedReponse = await Reponse.findByIdAndDelete(req.params.id);
        if (!deletedReponse) {
            return res.status(404).json({ status: "FAILED", message: "Response not found" });
        }

        // Remove from Question's reponses array
        await Question.updateOne(
            { _id: deletedReponse.question },
            { $pull: { reponses: deletedReponse._id } }
        );

        res.status(200).json({ status: "SUCCESS", message: "Response deleted successfully" });
    } catch (error) {
        res.status(500).json({ status: "FAILED", message: error.message });
    }
}

async function getReponsesByQuestionId(req, res) {
    try {
      if (!req.params.questionId.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ status: "FAILED", message: "Invalid Question ID format" });
      }
      const reponses = await Reponse.find({ questionId: req.params.questionId });
      if (!reponses || reponses.length === 0) {
        return res.status(204).json({ status: "SUCCESS", message: "No responses found", data: [] });
      }
      res.status(200).json({ status: "SUCCESS", message: "Responses retrieved successfully", data: reponses });
    } catch (error) {
      res.status(500).json({ status: "FAILED", message: error.message });
    }
  }

module.exports = {
    addReponseToQuestion,
    getAllReponses,
    getReponseById,
    updateReponse,
    deleteReponse,
    getReponsesByQuestionId
};