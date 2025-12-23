const Like = require("../models/likeModel");
const Post = require("../models/postModel");

exports.likePost = async (req, res) => {
  try {
    const { post, user } = req.body;
    const likeData = new Like({ post, user });
    const savedData = await likeData.save();

    const updatedData = await Post.findByIdAndUpdate(
      post,
      { $push: { likes: savedData } },
      { new: true }
    )
      .populate("likes")
      .exec();

    res.status(200).json({
      message: "Successfully posted",
      data: updatedData,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.unlikePost = async (req, res) => {
  try {
    const { post, user } = req.body;

    // const deletedLike = await Like.findOneAndDelete({ post: post, _id: user });
    const deletedLike = await Like.findOneAndDelete({ post, user });

    const updatedData = await Post.findByIdAndUpdate(
      post,
      { $pull: { likes: deletedLike._id } },
      { new: true }
    );

    res.status(200).json({
      message: "Successfully posted",
      data: updatedData,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
