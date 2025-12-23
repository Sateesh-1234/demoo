const express = require("express");
const router = express.Router();

const { createPost } = require("../controllers/postController");
const { getAllPosts } = require("../controllers/postController");
const { createComment } = require("../controllers/commentController");
const { likePost } = require("../controllers/likeController");
const { unlikePost } = require("../controllers/likeController");
// const { signup, signin } = require("../controllers/authController");

router.post("/post/create", createPost);
router.get("/post/allPosts", getAllPosts);
router.post("/comment/create", createComment);
router.post("/like/create", likePost);
router.post("/unlike/create", unlikePost);
// router.post("/user", signup);
// router.post("/user/signin", signin);

// const {
//   auth,
//   isVisitor,
//   isBlogger,
//   isAdmin,
// } = require("../middlewares/middleware");
// router.get("/visitor", auth, isVisitor, (req, res) => {
//   res.status(200).json({
//     message: "Welcome to the visitor Dashboard",
//   });
// });
// router.get("/blogger", auth, isBlogger, (req, res) => {
//   res.status(200).json({
//     message: "Welcome to the Blogger Dashboard",
//   });
// });
// router.get("/admin", auth, isAdmin, (req, res) => {
//   res.status(200).json({
//     message: "Welcome to the Admin Dashboard",
//   });
// });

module.exports = router;
