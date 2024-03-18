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

  exports.createBlogController = async (req, res) => {
    try {
      const { title, description, image, user } = req.body;
      //validation
      if (!title || !description || !image || !user) {
        return res.status(400).send({
          success: false,
          message: "Please Provide ALl Fields",
        });
      }
      const exisitingUser = await userModel.findById(user);
      //validaton
      if (!exisitingUser) {
        return res.status(404).send({
          success: false,
          message: "unable to find user",
        });
      }
  
      const newBlog = new blogModel({ title, description, image, user });
      const session = await mongoose.startSession();
      session.startTransaction();
      await newBlog.save({ session });
      exisitingUser.blogs.push(newBlog);
      await exisitingUser.save({ session });
      await session.commitTransaction();
      await newBlog.save();
      return res.status(201).send({
        success: true,
        message: "Blog Created!",
        newBlog,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send({
        success: false,
        message: "Error WHile Creting blog",
        error,
      });
    }
  };
  exports.updateBlogController=async(req,res)=>{
    try{
        const{id}=req.params;
const {title,description,image}=req.body
const blog=await blogModel.findByIdAndUpdate(id,{...req.body},{new:true})
return res.status(200).send({
    success:true,
    message:'blog update succesfully',
    blog,
})
    }catch(error){
        return res.status(400).send({
            success: false,
            message: "Error While updating Blogs",
            error,
          });
    }
  }

  exports.getBlogByIdController=async(req,res)=>{
try{
const {id}=req.params
const blog=await blogModel.findById(id)
if(!blog){
  return res.status(404).send({
    message:'there is no such blog along this id',
    success:false,
  })
}
return res.status(200).send({
  message:'blog along with the id',
  success:true,
  blog,
})
}catch(error){
  return res.status(400).send({
    success: false,
    message: "Error While fething Blogs",
    error,
  });
}
  }
  exports.deleteBlogController=async(req,res)=>{
try{
await blogModel.findOneAndDelete(req.params.id)
return res.status(200).send({
  message:"blog deleted!",
  success:true,

})
}catch(error){
return res.status(400).send({
  message:"something went wrong while delete",
  success:false,
  error
})
}
  }
exports.userBlogControlller=(req,res)=>{

}