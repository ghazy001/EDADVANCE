const mongoose = require('mongoose');

const ModuleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Module', ModuleSchema);
