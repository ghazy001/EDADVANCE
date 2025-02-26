const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GamificationSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true }, 
    points: { type: Number, default: 0 },
    badges: [{ type: String }]
});

const Gamification = mongoose.model("Gamification", GamificationSchema);
module.exports = Gamification;
