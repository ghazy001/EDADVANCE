const express = require('express');
const router = express.Router();
const emotionController = require('../controller/emotionController');

router.post('/log', emotionController.logEmotion);
router.get('/report/:sessionId', emotionController.getEmotionReport);

module.exports = router;