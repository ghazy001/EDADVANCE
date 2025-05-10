const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const courseSchema = new Schema({
  title: { type: String, required: true }, 
  price: { type: Number, required: true },
  description: { type: String }, 
  category: { type: String, required: true },
  instructors: { type: String }, 
  rating: { type: Number, default: 0, min: 0, max: 5 }, 
  thumb: { type: String },
  skill_level: { type: String, enum: ["Beginner", "Intermediate", "Advanced"] },
  price_type: { type: String, enum: ["Free", "Paid"] }, 
  language: { type: String, default: "Arabic" }, 
  popular: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  programmingLanguage:{ type: String, default: "php" }
});

module.exports = mongoose.model("Course", courseSchema);