// models/User.js
const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
    required: true,
  },
  resetToken: {
    type: String,
  },
  resetTokenExpiration: {
    type: Date,
  },
  googleId: {
    type: String,
    sparse: true,
  },
  facebookId: {
    type: String,
    sparse: true,
  },
  githubId: {
    type: String,
    sparse: true,
  },
  facialId: {
    type: String,
    unique: true,
    sparse: true,
  },
  level: {
    type: Number,
    default: 0,
  },
  completedModules: [
    {
      moduleId: {
        type: Schema.Types.ObjectId,
        ref: "Module",
      },
      moduleName: {
        type: String,
      },
    },
  ],
  verified: {
    type: Boolean,
    default: false,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  // New fields for the ranking feature
  totalScore: {
    type: Number,
    default: 0, // Total score for the user
  },
  spots: {
    type: Number,
    default: 0, // Number of spots (e.g., quiz attempts or activities)
  },
  updates: {
    type: Number,
    default: 0, // Number of updates (e.g., profile updates or contributions)
  },
  profilePicture: {
    type: String,
    default: "default.jpg", // URL or path to the user's profile picture
  },
});

module.exports = mongoose.model("User", userSchema);