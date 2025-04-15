const express = require("express");
const router = express.Router();
const {
    addReponseToQuestion,
    getAllReponses,
    getReponseById,
    updateReponse,
    deleteReponse,
    getReponsesByQuestionId
} = require("../controller/ResponseController"); // Path to your controller

router.use(express.json());

router.post("/question/:questionId", addReponseToQuestion);
router.get("/getAll", getAllReponses);
router.get("/:id", getReponseById);
router.put("/:id", updateReponse);
router.delete("/:id", deleteReponse);
router.get("/question/:questionId", getReponsesByQuestionId);

module.exports = router;