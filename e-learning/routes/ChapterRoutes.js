const express = require("express");
const router = express.Router();
const ChapterController = require("../controller/ChapterController");

router.post("/add", ChapterController.add);
router.get("/", ChapterController.getAll);
router.get("/:id", ChapterController.getById);
router.put("/update/:id", ChapterController.update);
router.delete("/delete/:id", ChapterController.deleteChapter);
router.delete("/delete", ChapterController.deleteAll);

module.exports = router;
