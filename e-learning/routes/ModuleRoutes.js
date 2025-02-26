const express = require("express");
const router = express.Router();
const moduleController = require("../controller/ModuleController");

router.post("/add", moduleController.add);
router.get("/", moduleController.getAll);
router.get("/:id", moduleController.getById);
router.put("/update/:id", moduleController.update);
router.delete("/delete/:id", moduleController.deleteModule);
router.delete("/delete", moduleController.deleteAll);

module.exports = router;
