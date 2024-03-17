import mongoose from "mongoose";

const LoginSchema = new mongoose.Schema({
  f_no:{
    type:String,
  },
  userName:{  
    type:String,
    required:true,
  },
  Password:{
    type:String,
    required:true,
  }}
  ,{
    timestamps: true, 
  }
)

const Login = mongoose.model("Login", LoginSchema);
export default Login;