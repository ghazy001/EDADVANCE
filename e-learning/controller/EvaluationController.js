const Evaluation = require("../models/Evaluation");
const User = require("../models/User");

async function add(req, res) {
    try {
        const { user } = req.body;

        const existingUser = await User.findById(user);
        if (!existingUser) {
            return res.status(404).json({ error: "User not found" });
        }

        const evaluation = new Evaluation(req.body);
        await evaluation.save();

        res.status(201).json(evaluation);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

async function getAll(req, res) {
    try {
        const evaluations = await Evaluation.find().populate("user"); 
        res.status(200).json(evaluations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


async function getById(req, res) {
    try {
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: "Invalid Evaluation ID format" });
        }
        const evaluation = await Evaluation.findById(req.params.id).populate("user");
        if (!evaluation) {
            return res.status(404).json({ error: "Evaluation not found" });
        }
        res.status(200).json(evaluation);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


async function update(req, res) {
    try {
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: "Invalid Evaluation ID format" });
        }

        const updatedEvaluation = await Evaluation.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedEvaluation) {
            return res.status(404).json({ error: "Evaluation not found" });
        }

        res.status(200).json({ message: "Evaluation updated successfully", updatedEvaluation });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

async function deleteEvaluation(req, res) {
    try {
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: "Invalid Evaluation ID format" });
        }
        const deletedEvaluation = await Evaluation.findByIdAndDelete(req.params.id);
        if (!deletedEvaluation) {
            return res.status(404).json({ error: "Evaluation not found" });
        }
        res.status(200).json({ message: "Evaluation deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


async function deleteAll(req, res) {
    try {
        const result = await Evaluation.deleteMany({});
        res.status(200).json({ message: `${result.deletedCount} evaluations deleted successfully` });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { add, getAll, getById, update, deleteEvaluation, deleteAll };
