const Post = require("../models/postModel");

// Créer une fonction qui va créer un post
exports.createPost = async (req, res) => {
  try {
    const post = new Post(req.body);
    post.author = req.user._id;
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
