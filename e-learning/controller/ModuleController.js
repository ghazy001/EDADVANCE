const Module = require("../models/Module");

async function add(req, res) {
    try {
        const module = new Module(req.body);
        await module.save();
        res.status(201).json(module);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

async function getAll(req, res) {
    try {
        const modules = await Module.find();
        res.status(200).json(modules);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function getById(req, res) {
    try {
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: "Invalid Module ID format" });
        }
        const module = await Module.findById(req.params.id);
        if (!module) {
            return res.status(404).json({ error: "Module not found" });
        }
        res.status(200).json(module);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function update(req, res) {
    try {
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: "Invalid Module ID format" });
        }
        const updatedModule = await Module.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedModule) {
            return res.status(404).json({ error: "Module not found" });
        }
        res.status(200).json({ message: "Module updated successfully", updatedModule });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

async function deleteModule(req, res) {
    try {
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ error: "Invalid Module ID format" });
        }
        const deletedModule = await Module.findByIdAndDelete(req.params.id);
        if (!deletedModule) {
            return res.status(404).json({ error: "Module not found" });
        }
        res.status(200).json({ message: "Module deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function deleteAll(req, res) {
    try {
        const result = await Module.deleteMany({});
        res.status(200).json({ message: `${result.deletedCount} modules deleted successfully` });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { add, getAll, getById, update, deleteModule, deleteAll };
