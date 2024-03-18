const express = require("express");
const {
  getAllBlogsController,
  createBlogController,
  updateBlogController,
  getBlogByIdController,
  deleteBlogController,
  userBlogControlller,
} = require("../controllers/blogController");

//router object
const router = express.Router();

//routes
// GET || all blogs
router.get("/allBlog", getAllBlogsController);

//POST || create blog
router.post("/createBlog", createBlogController);

//PUT || update blog
router.put("/updateBlog/:id", updateBlogController);

//GET || SIngle Blog Details
router.get("/getBlog/:id", getBlogByIdController);

//DELETE || delete blog
router.delete("/deleteBlog/:id", deleteBlogController);

//GET || user blog
router.get("/user-blog/:id", userBlogControlller);

module.exports = router;
