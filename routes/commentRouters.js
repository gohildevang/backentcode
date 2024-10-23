const express = require('express');
const commentController = require('../controllers/commentController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/:id', authMiddleware, commentController.postComment);
router.get('/:id', commentController.getAllComments);

module.exports = router;