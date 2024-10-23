const Question = require('../models/questionModel');
const authMiddleware = require('../middleware/authMiddleware');

const postQuestion = async (req, res) => {
  try {
    const { title, description, tags } = req.body;

    const newQuestion = new Question({
      title,
      description,
      tags,
      author: req.user.id
    });

    await newQuestion.save();

    res.status(201).json({ message: 'Question posted successfully', question: newQuestion });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find().populate('author').sort({ timestamp: -1 });

    res.status(200).json({ questions });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
const getQuestionById = async (req, res) => {
    try {
      const question = await Question.findById(req.params.id).populate('author');
  
      if (!question) {
        return res.status(404).json({ message: 'Question not found' });
      }
  
      res.status(200).json({ question });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };
  
module.exports = { postQuestion, getAllQuestions, getQuestionById };