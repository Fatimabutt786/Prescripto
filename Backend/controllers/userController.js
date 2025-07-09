import validator from 'validator'
import bycrypt, { hashSync } from 'bcrypt'
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'
// api to register user
const registerUser = async (req,res)=>{
    try {
        const { name,email,password} = req.body;
       if(!name || !email || !password){
         return res.json({success:false,message:"Missing Details"});

       }
        // validating email format 
if(!validator.isEmail(email)){
    return res.json({success:false,message:"Enter a Valid email"});
}
// validating strong password
if(password.length < 8) {
     return res.json({success:false,message:"Please Enter a Strong Password"});
}
// hashing user password
const salt = await bycrypt.genSalt(10)
const hashedPassword = await bycrypt.hash(password,salt);
const userData = {
    name,email,password:hashedPassword
}
const newUser = new userModel(userData)
const user = await newUser.save()

const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
return res.json({success:true,token})


    } catch (error) {
  return res.json({success:false,message:error.message})     
    }
}

// API for user login
const loginUser = async (req,res) =>{
    try {
        const {email,password} = req.body;
        const user = await userModel.findOne({email})
        if(!user) {
            return res.json({success:false,message:"User does not exist"})
        }
       const isMatch = await bycrypt.compare(password,user.password) 
       if(isMatch) {
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
   return  res.json({success:true,token})
       }else{
       return res.json({success:false,message:"Invalid credentials"})
       }
    } catch (error) {
       return res.json({success:false,message:error.message})     
    }
}


// get user data
const getProfile = async (req,res) =>{
    try {
       const userId = req.userId;
        const userData = await userModel.findById(userId).select('-password')
        return res.json({success:true,userData})

    } catch (error) {
          return res.json({success:false,message:error.message})     
    }
}

// update user profile
const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;

    if (!name || !phone || !address || !dob || !gender) {
      return res.json({ success: false, message: "Missing Fields" });
    }

    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender
    });

    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' });
      const imageURL = imageUpload.secure_url;

      await userModel.findByIdAndUpdate(userId, { image: imageURL });
    }

    res.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
}


export {registerUser,loginUser, getProfile, updateProfile}