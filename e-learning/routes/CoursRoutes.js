const express = require("express");
const CoursController = require("../controller/CoursController");

const router = express.Router();

router.post("/add", CoursController.add);
router.get("/", CoursController.getAll);
router.get("/:id", CoursController.getById);
router.put("/update/:id", CoursController.update);
router.delete("/delete/:id", CoursController.deleteCours);
router.delete("/delete", CoursController.deleteAll);

module.exports = router;
