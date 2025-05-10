const mongoose = require('mongoose');

const EmotionSchema = new mongoose.Schema({
  quizId: { type: String, required: true },
  userId: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  emotion: { type: String, required: true },
  intensity: { type: Number, default: 0 },
  sessionId: { type: String, required: true },
});

module.exports = mongoose.model('Emotion', EmotionSchema);