const express = require("express");
const router = express.Router();
const EvaluationController = require("../controller/EvaluationController");

router.post("/add", EvaluationController.add);
router.get("/", EvaluationController.getAll);
router.get("/:id", EvaluationController.getById);
router.put("/update/:id", EvaluationController.update);
router.delete("/delete/:id", EvaluationController.deleteEvaluation);
router.delete("/delete", EvaluationController.deleteAll);

module.exports = router;
