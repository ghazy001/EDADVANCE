const express = require("express");
const router = express.Router();
const eventController = require("../controller/EventController");

// Routes pour les événements
router.get("/getAll", eventController.getAll);  // Pour récupérer tous les événements
router.get("/:id", eventController.getById);  // Pour récupérer un événement par ID
router.post("/add", eventController.add);  // Pour créer un événement
router.put("/update/:id", eventController.update);  // Pour mettre à jour un événement
router.delete("/delete/:id", eventController.deleteEvent);  // Pour supprimer un événement

module.exports = router;
