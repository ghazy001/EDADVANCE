    const mongoose = require("mongoose");

    const Schema = mongoose.Schema;

    const Course = new Schema({
        title: { type: String},
        price: { type: Number},
        description: { type: String}, // Maps to 'desc'
        category: { type: String },
        instructors: { type: String },
        rating: { type: Number, default: 0 },
        thumb: { type: String },
        skill_level: { type: String },
        price_type: { type: String }, 
        language: { type: String},
        popular: { type: String }, 
        createdAt: { type: Date, default: Date.now },
        programmingLanguage: { type: String }
        
    });

    module.exports = mongoose.model("Course", Course);