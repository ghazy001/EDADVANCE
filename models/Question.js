  const mongoose = require("mongoose");
  const Schema = mongoose.Schema;

  const questionSchema = new Schema({
    contenu: { type: String, required: true },
    score: { type: Number, required: true },
    correctAnswer: { type: String, required: true },
    quiz: { type: Schema.Types.ObjectId, ref: "Quiz", required: true },
    
    reponses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reponse" }]
  });

  module.exports = mongoose.model("Question", questionSchema);