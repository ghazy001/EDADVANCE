const Chapter = require("../models/Chapter");
const Module = require("../models/Module");

async function add(req, res) {
    try {
        const { module } = req.body;
        const existingModule = await Module.findById(module);
        if (!existingModule) {
            return res.status(404).json({ error: "Module not found" });
        }

        const chapter = new Chapter(req.body);
        await chapter.save();

        res.status(201).json(chapter);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

async function getAll(req, res) {
    try {
        const chapters = await Chapter.find().populate("module"); 
        res.status(200).json(chapters);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function getById(req, res) {
    try {
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: "Invalid Chapter ID format" });
        }
        const chapter = await Chapter.findById(req.params.id).populate("module");
        if (!chapter) {
            return res.status(404).json({ error: "Chapter not found" });
        }
        res.status(200).json(chapter);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function update(req, res) {
    try {
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: "Invalid Chapter ID format" });
        }
        
        const updatedChapter = await Chapter.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedChapter) {
            return res.status(404).json({ error: "Chapter not found" });
        }
        
        res.status(200).json({ message: "Chapter updated successfully", updatedChapter });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

async function deleteChapter(req, res) {
    try {
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: "Invalid Chapter ID format" });
        }
        const deletedChapter = await Chapter.findByIdAndDelete(req.params.id);
        if (!deletedChapter) {
            return res.status(404).json({ error: "Chapter not found" });
        }
        res.status(200).json({ message: "Chapter deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function deleteAll(req, res) {
    try {
        const result = await Chapter.deleteMany({});
        res.status(200).json({ message: `${result.deletedCount} chapters deleted successfully` });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { add, getAll, getById, update, deleteChapter, deleteAll };
