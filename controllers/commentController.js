const Post = require("../models/postModel");
const Comment = require("../models/commentModel");
exports.createComment = async (req, res) => {
  try {
    const { post, user, comment } = req.body;
    const commentData = new Comment({ post, user, comment });
    const savedComment = await commentData.save();

    const updatePost = await Post.findByIdAndUpdate(
      post,
      { $push: { comments: savedComment } },
      { new: true }
    )
      .populate("comments")
      .exec();
    res.status(200).json({
      message: "comment successfully posted",
      post: updatePost,
    });
  } catch (error) {
    res.status(400).json({
      message: "There is an issue.",
    });
  }
};
