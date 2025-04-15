const mongo = require("mongoose")

const Schema = mongo.Schema

const User = new Schema({
    name: { type: String, required: true },
    password: { type: String},
    email: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user", required: true },
    resetToken: String,
    resetTokenExpiration: Date,
    googleId: { type: String }, 
    facebookId: { type: String }, 
    facialId: { type: String, unique: true, sparse: true },
    githubId: { type: String }, 
    microsoftId: { type: String, unique: true, sparse: true },
    googleAccessToken: String, // Add this
    googleRefreshToken: String, 
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
      },// Add this (optional)
})


module.exports = mongo.model("user",User)
