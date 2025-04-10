const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReponseSchema = new Schema({
    question: { type: Schema.Types.ObjectId, ref: "Question", required: true }, // Reference to Question
    texte: { type: String, required: true } 
});

module.exports = mongoose.model("Reponse", ReponseSchema);