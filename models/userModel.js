const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "username name is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    // unique:[true,'email will unique']
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  blogs:[
{
  type:mongoose.Types.ObjectId,
ref:'Blog',
}
  ]
},
{timestamps:true}
);
const userModel=mongoose.model('User',userSchema)
module.exports=userModel