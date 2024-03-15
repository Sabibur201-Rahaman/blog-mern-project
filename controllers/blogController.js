const mongoose=require("mongoose")
const userModel=require("../models/userModel")
const blogModel=require("../models/blogModel")

exports.getAllBlogsController = async (req, res) => {
    try {
      const blogs = await blogModel.find({}).populate("user");
      if (!blogs) {
        return res.status(200).send({
          success: false,
          message: "No Blogs Found",
        });
      }
      return res.status(200).send({
        success: true,
        BlogCount: blogs.length,
        message: "All Blogs lists",
        blogs,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: "Error WHile Getting Blogs",
        error,
      });
    }
  };

  exports.createBlogController=async(req,res)=>{
try{
const {title,description,image}=req.body
if(!title||!description||!image){
return res.status(200).send({
    message:'provide all fields',
    success:false,
})

}
const newBlog=new blogModel({title,description,image})
await newBlog.save()
return res.status(201).send({
    message:'new blog created',
    success:true,
    newBlog,
})
}catch(error){
    return res.status(400).send({
        success: false,
        message: "Error While Creating Blogs",
        error,
      });
}
  }
  exports.updateBlogController=(req,res)=>{

  }

  exports.getBlogByIdController=(req,res)=>{

  }
  exports.deleteBlogController=(req,res)=>{

  }
exports.userBlogControlller=(req,res)=>{

}