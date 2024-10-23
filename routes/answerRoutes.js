const express = require('express');
const answerController = require('../controllers/answerController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/:questionId', authMiddleware, answerController.postAnswer);
router.get('/:questionId', answerController.getAllAnswersByQuestionId);

module.exports = router;