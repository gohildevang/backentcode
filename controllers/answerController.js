const Answer = require('../models/answerModel');
const authMiddleware = require('../middleware/authMiddleware');

const postAnswer = async (req, res) => {
  try {
    const { content } = req.body;
    const questionId = req.params.questionId;

    const newAnswer = new Answer({
      content,
      questionId,
      author: req.user.id
    });

    await newAnswer.save();

    res.status(201).json({ message: 'Answer posted successfully', answer: newAnswer });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getAllAnswersByQuestionId = async (req, res) => {
  try {
    const answers = await Answer.find({ questionId: req.params.questionId }).populate('author').sort({ timestamp: -1 });

    res.status(200).json({ answers });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { postAnswer, getAllAnswersByQuestionId };