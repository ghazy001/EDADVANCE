const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ScoreQuizSchema = new Schema({
    quiz: { type: Schema.Types.ObjectId, ref: "Quiz", required: true }, // Reference to Quiz
    valeur: { type: Number, required: true } // Score value
});

module.exports = mongoose.model("ScoreQuiz", ScoreQuizSchema);