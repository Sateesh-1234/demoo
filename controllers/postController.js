const Post = require("../models/postModel");
exports.createPost = async (req, res) => {
  try {
    const { title, description } = req.body;
    const post = new Post({ title, description });
    const savedPost = await post.save();

    res.status(200).json({
      message: "Data successfully posted",
      post: savedPost,
    });
  } catch (error) {
    res.status(400).json({
      message: "There is an issue.",
    });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("comments")
      .populate("likes")
      .exec();

    res.status(200).json({
      data: posts,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
