const Gamification = require("../models/Gamification");

async function add(req, res) {
    try {
        const gamification = new Gamification(req.body);
        await gamification.save();
        res.status(201).json(gamification);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

async function getAll(req, res) {
    try {
        const gamifications = await Gamification.find().populate("user", "name email");
        res.status(200).json(gamifications);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function getById(req, res) {
    try {
        const gamification = await Gamification.findById(req.params.id).populate("user", "name email");
        if (!gamification) return res.status(404).json({ error: "Gamification record not found" });
        res.status(200).json(gamification);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function update(req, res) {
    try {
        const updatedGamification = await Gamification.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedGamification) return res.status(404).json({ error: "Gamification record not found" });
        res.status(200).json({ message: "Gamification record updated successfully", updatedGamification });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

async function deleteGamification(req, res) {
    try {
        const deletedGamification = await Gamification.findByIdAndDelete(req.params.id);
        if (!deletedGamification) return res.status(404).json({ error: "Gamification record not found" });
        res.status(200).json({ message: "Gamification record deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { add, getAll, getById, update, deleteGamification };
