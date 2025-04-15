const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quizSchema = new Schema({
    _id: { type: String },
  titre: { type: String, required: true },
  description: String,
  cours: { type: Schema.Types.ObjectId, ref: "Cours" },
  questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  scores: [
    {
      userId: String, // Adjust based on your user ID format
      score: Number,
      submittedAt: Date,
      isTimedOut: Boolean,
    },
  ],
});

module.exports = mongoose.model("Quiz", quizSchema);