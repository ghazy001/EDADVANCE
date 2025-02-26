const Cours = require("../models/Cours");
const Chapter = require("../models/Chapter");

async function add(req, res) {
    try {
        const { title, content, video_url, image_url, chapter } = req.body;

        // Check if the chapter exists
        const existingChapter = await Chapter.findById(chapter);
        if (!existingChapter) {
            return res.status(404).json({ error: "Chapter not found" });
        }

        const cours = new Cours({ title, content, video_url, image_url, chapter });
        await cours.save();

        res.status(201).json(cours);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}


async function getAll(req, res) {
    try {
        const coursList = await Cours.find().populate("chapter"); 
        res.status(200).json(coursList);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function getById(req, res) {
    try {
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: "Invalid Cours ID format" });
        }
        const cours = await Cours.findById(req.params.id).populate("chapter");
        if (!cours) {
            return res.status(404).json({ error: "Cours not found" });
        }
        res.status(200).json(cours);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function update(req, res) {
    try {
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: "Invalid Cours ID format" });
        }
        
        const updatedCours = await Cours.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedCours) {
            return res.status(404).json({ error: "Cours not found" });
        }
        
        res.status(200).json({ message: "Cours updated successfully", updatedCours });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

async function deleteCours(req, res) {
    try {
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: "Invalid Cours ID format" });
        }
        const deletedCours = await Cours.findByIdAndDelete(req.params.id);
        if (!deletedCours) {
            return res.status(404).json({ error: "Cours not found" });
        }
        res.status(200).json({ message: "Cours deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function deleteAll(req, res) {
    try {
        const result = await Cours.deleteMany({});
        res.status(200).json({ message: `${result.deletedCount} cours deleted successfully` });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { add, getAll, getById, update, deleteCours, deleteAll };
