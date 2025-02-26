const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date, required: true },
    moduleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Module' }
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);
