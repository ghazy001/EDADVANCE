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
})


module.exports = mongo.model("user",User)
