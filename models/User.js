const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  password: { type: String },
  email: { type: String, required: true, unique: true },
  role: {
    type: String,
    enum: ["admin", "instructor", "user"],
    default: "user",
    required: true,
  },
  resetToken: String,
  resetTokenExpiration: Date,
  googleId: { type: String },
  facebookId: { type: String },
  facialId: { type: String, unique: true, sparse: true },
  githubId: { type: String },
  microsoftId: { type: String, unique: true, sparse: true },
  googleAccessToken: String,
  googleRefreshToken: String,
  level: { type: Number, default: 0 },
  completedModules: [
    {
      moduleId: { type: Schema.Types.ObjectId, ref: "Module" },
      moduleName: { type: String },
    },
  ],
  verified: { type: Boolean, default: false },
  creationDate: { type: Date, default: Date.now },
  totalScore: { type: Number, default: 0 },
  spots: { type: Number, default: 0 },
  updates: { type: Number, default: 0 },
  profilePicture: { type: String, default: "default.jpg" },
});

module.exports = mongoose.model("User", UserSchema);