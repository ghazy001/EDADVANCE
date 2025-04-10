const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  contenu: [{ type: String }], // Array of PDF URLs
  price: { type: Number },
  category: { type: String },
  instructors: { type: String },
  rating: { type: Number },
  skill_level: { type: String },
  price_type: { type: String },
  language: { type: String },
  popular: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Course', courseSchema);