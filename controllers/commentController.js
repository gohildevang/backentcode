const Comment = require('../models/commentModel');
const authMiddleware = require('../middleware/authMiddleware');

const postComment = async (req, res) => {
  try {
    const { content } = req.body;
    const { questionId, answerId } = req.params;

    const newComment = new Comment({
      content,
      questionId,
      answerId,
      author: req.user.id
    });

    await newComment.save();

    res.status(201).json({ message: 'Comment posted successfully', comment: newComment });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find({ $or: [{ questionId: req.params.id }, { answerId: req.params.id }] }).populate('author').sort({ timestamp: -1 });

    res.status(200).json({ comments });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { postComment, getAllComments };