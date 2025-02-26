const Reclamation = require("../models/Reclamation");

async function add(req, res) {
    try {
        const reclamation = new Reclamation(req.body);
        await reclamation.save();
        res.status(201).json(reclamation);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

async function getAll(req, res) {
    try {
        const reclamations = await Reclamation.find().populate("user", "name email");
        res.status(200).json(reclamations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function getById(req, res) {
    try {
        const reclamation = await Reclamation.findById(req.params.id).populate("user", "name email");
        if (!reclamation) return res.status(404).json({ error: "Reclamation not found" });
        res.status(200).json(reclamation);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function update(req, res) {
    try {
        const updatedReclamation = await Reclamation.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedReclamation) return res.status(404).json({ error: "Reclamation not found" });
        res.status(200).json({ message: "Reclamation updated successfully", updatedReclamation });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

async function deleteReclamation(req, res) {
    try {
        const deletedReclamation = await Reclamation.findByIdAndDelete(req.params.id);
        if (!deletedReclamation) return res.status(404).json({ error: "Reclamation not found" });
        res.status(200).json({ message: "Reclamation deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { add, getAll, getById, update, deleteReclamation };
