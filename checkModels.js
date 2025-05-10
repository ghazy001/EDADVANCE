const axios = require("axios");
require("dotenv").config();

const API_KEY = process.env.GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1/models?key=${API_KEY}`;

async function listModels() {
  try {
    const response = await axios.get(API_URL);
    console.log("Available Models:", response.data.models.map(m => m.name));
  } catch (error) {
    console.error("Error listing models:", error.response ? error.response.data : error.message);
  }
}

listModels();
