const mongoose = require('mongoose');

const EvaluationSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    moduleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Module', required: true },
    score: { type: Number, required: true },
    feedback: { type: String },
    type: { type: String, enum: ['quiz', 'assignment', 'exam'], required: true },
    date: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Evaluation', EvaluationSchema);
