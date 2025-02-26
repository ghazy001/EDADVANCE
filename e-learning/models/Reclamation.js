const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReclamationSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true }, 
    message: { type: String, required: true },
    status: { type: String, enum: ["pending", "resolved", "rejected"], default: "pending" }
});

const Reclamation = mongoose.model("Reclamation", ReclamationSchema);
module.exports = Reclamation;
