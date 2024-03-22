const Comment = require('../models/commentModel');

exports.createComment = async (req, res) => {
  try {
    const { postId, content, author } = req.body;
    const comment = new Comment({ postId, content, author });
    const savedComment = await comment.save();
    res.status(201).json(savedComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
