const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CoursSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    video_url: { type: String },
    image_url: { type: String, required: true }, // New field for image
    chapter: { type: Schema.Types.ObjectId, ref: "Chapter", required: true }
});

const Cours = mongoose.model("Cours", CoursSchema);
module.exports = Cours;
