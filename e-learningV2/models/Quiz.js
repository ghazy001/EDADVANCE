const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quizSchema = new Schema(
    {
        _id: { type: String },
        titre: { type: String, required: true },
        description: String,
        cours: { type: Schema.Types.ObjectId, ref: "Cours" },
        questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
        scores: [
            {
                userId: String,
                score: Number,
                submittedAt: Date,
                isTimedOut: Boolean,
            },
        ],
    },
    { collection: "quizzes" } // Changer pour correspondre à la collection réelle
);

module.exports = mongoose.model("Quiz", quizSchema);