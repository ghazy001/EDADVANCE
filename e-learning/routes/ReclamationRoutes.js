const express = require("express");
const router = express.Router();
const ReclamationController = require("../controller/ReclamationController");

router.post("/add", ReclamationController.add);
router.get("/", ReclamationController.getAll);
router.get("/getById/:id", ReclamationController.getById);
router.put("/update/:id", ReclamationController.update);
router.delete("/delete/:id", ReclamationController.deleteReclamation);

module.exports = router;
