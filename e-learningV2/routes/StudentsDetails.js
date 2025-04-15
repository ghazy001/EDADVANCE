const express = require("express");
const cors = require("cors");

const router = express.Router();
const studentsDetailsController = require('./../controller/StudentsDetailsController')

// Middleware
router.use(cors({ origin: process.env.FRONTEND_URL || "*", credentials: true }));
router.use(express.json());

router.get("/", studentsDetailsController.getEtudiants);

module.exports = router