const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    questionText: { type: String, required: true },
    options: { type: [String], required: true },
    correctAnswer: { type: String, required: true }
});

const QuizSchema = new mongoose.Schema({
    title: { type: String, required: true },
    questions: [QuestionSchema], 
    moduleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Module', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Quiz', QuizSchema);
