const express = require('express');
const questionController = require('../controllers/questionController');
const authMiddleware = require('../middleware/authMiddleware');
const searchController = require('../controllers/searchController')

const router = express.Router();

router.post('/', authMiddleware, questionController.postQuestion);
router.get('/', questionController.getAllQuestions);
router.get('/:id', questionController.getQuestionById);
router.get('/search', searchController.searchQuestions);

module.exports = router;