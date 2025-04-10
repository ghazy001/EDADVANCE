const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LessonSchema = new Schema({
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true }, // Link to Course
    title: { type: String, required: true },
    videoUrl: { type: String }, // URL or path to the video
    duration: { type: String }, // e.g., "03:03"
    isLocked: { type: Boolean, default: true }, // Whether the lesson is locked
    order: { type: Number, required: true }, // Order of the lesson
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Lesson", LessonSchema);