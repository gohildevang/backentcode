const Question = require('../models/questionModel');

const searchQuestions = async (req, res) => {
  try {
    const searchQuery = req.query.q;

    const questions = await Question.find({ $or: [{ title: { $regex: searchQuery, $options: 'i' } }, { tags: { $in: [searchQuery] } }] }).populate('author').sort({ timestamp: -1 });

    res.status(200).json({ questions });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { searchQuestions };