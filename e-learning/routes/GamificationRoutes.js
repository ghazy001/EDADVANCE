const express = require("express");
const router = express.Router();
const GamificationController = require("../controller/GamificationController");

router.post("/add", GamificationController.add);
router.get("/", GamificationController.getAll);
router.get("/getById/:id", GamificationController.getById);
router.put("/update/:id", GamificationController.update);
router.delete("/delete/:id", GamificationController.deleteGamification);

module.exports = router;
