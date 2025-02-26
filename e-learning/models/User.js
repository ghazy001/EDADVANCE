const mongo = require("mongoose")

const Schema = mongo.Schema

const User = new Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user", required: true },
    resetToken: String,
    resetTokenExpiration: Date,
})


module.exports = mongo.model("user",User)
