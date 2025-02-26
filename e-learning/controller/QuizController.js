const Quiz = require("../models/Quiz");

async function add(req, res) {
    try {
        const quiz = new Quiz(req.body);
        await quiz.save();
        res.status(201).json(quiz);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

async function getAll(req, res) {
    try {
        const quizzes = await Quiz.find();
        res.status(200).json(quizzes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function getById(req, res) {
    try {
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: "Invalid Quiz ID format" });
        }
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) {
            return res.status(404).json({ error: "Quiz not found" });
        }
        res.status(200).json(quiz);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function update(req, res) {
    try {
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: "Invalid Quiz ID format" });
        }
        const updatedQuiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedQuiz) {
            return res.status(404).json({ error: "Quiz not found" });
        }
        res.status(200).json({ message: "Quiz updated successfully", updatedQuiz });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

async function deleteQuiz(req, res) {
    try {
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: "Invalid Quiz ID format" });
        }
        const deletedQuiz = await Quiz.findByIdAndDelete(req.params.id);
        if (!deletedQuiz) {
            return res.status(404).json({ error: "Quiz not found" });
        }
        res.status(200).json({ message: "Quiz deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function deleteAll(req, res) {
    try {
        const result = await Quiz.deleteMany({});
        res.status(200).json({ message: `${result.deletedCount} quizzes deleted successfully` });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { add, getAll, getById, update, deleteQuiz, deleteAll };
