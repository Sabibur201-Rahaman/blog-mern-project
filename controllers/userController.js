
const userModel = require("../models/userModel");
const bcrypt=require('bcrypt')
exports.registerController = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    // Validate input fields
    if (!userName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all fields.",
      });
    }

    // Check if the user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists.",
      });
    }
const hashedPassword=await bcrypt.hash(password,10)
    // Create a new user instance
    const newUser = new userModel({ userName, email, password:hashedPassword });

    // Save the new user
    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "New user created.",
      user: newUser,
    });
  } catch (error) {
    console.error("Error in registerController:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

//get all users

exports.getAllUsers=async(req,res)=>{
try{
const users=await userModel.find({})
return res.status(200).send({
  userCount:users.length,
  message:'all users data',
  success:true,
  users

})
} catch(error){
  return res.status(500).json({
    success: false,
    message: "error in get all users data.",
    error: error.message,
  });
}
}


//login user
exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(401).send({
        success: false,
        message: "Please provide email or password",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "email is not registerd",
      });
    }
    //password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invlid username or password",
      });
    }
    return res.status(200).send({
      success: true,
      messgae: "login successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error In Login Callcback",
      error,
    });
  }
};