const express = require("express");
const {
  getAllBlogsController,
  createBlogController,
  updateBlogController,
  getBlogByIdController,
  deleteBlogController,
  userBlogControlller,
} = require("../controllers/blogController");
const middleWare=require('../middleware/AuthVerify')

//router object
const router = express.Router();

//routes
// GET || all blogs
router.get("/allBlog",middleWare,getAllBlogsController);

//POST || create blog
router.post("/createBlog",middleWare,createBlogController);

//PUT || update blog
router.put("/updateBlog/:id",middleWare,updateBlogController);

//GET || SIngle Blog Details
router.get("/getBlog/:id",middleWare,getBlogByIdController);

//DELETE || delete blog
router.delete("/deleteBlog/:id",middleWare,deleteBlogController);

//GET || user blog
router.get("/userBlog/:id",middleWare,userBlogControlller);

module.exports = router;
