import doctorModel from '../models/doctorModel.js'
import vallidator from 'validator'
import bycrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'
// API for adding doctor
const addDoctor = async (req,res) =>{
    try {
      const {name,email,password,speciality,degree,experience,about,fee,address} = req.body;
const imageFile = req.file;
// checking for all data to add doctor
console.log(name,email,password,speciality,degree,experience,about,fee,address,imageFile)
if(!name||!email,!password||!speciality||!degree||!experience|| !about || !fee || !address || !imageFile){
return res.json({success:false,message:"Missing Details"})
}
// validate email format
if(!vallidator.isEmail(email)){
  return res.json({success:false,message:"Please Enter a valid Email"})  
}
// validating strong password
if(password.length<8){
    return res.json({success:false,message:"Please Enter a Strong Password"})
}
// hashing doctor password
const salt = await bycrypt.genSalt(10);
const hashedPassword = await bycrypt.hash(password,salt)

// upload image to cloudinary
const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:"image"})
const imageUrl = imageUpload.secure_url

const doctorData = {
    name,email,image:imageUrl,password:hashedPassword,
    speciality,degree,experience,about,fee,address:JSON.parse(address),
    date:Date.now()
}

const newDoctor = new doctorModel(doctorData)
await newDoctor.save()
res.json({success:true,message:"Doctor Added"})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

// api for admin login
const loginAdmin = async (req,res) =>{
  try {
    const {email,password} = req.body
    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
   const token = jwt.sign(
  { email },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);

     res.json({success:true,token})
    }else{
        res.json({success:false,message:"Invalid Credentials"})
    }
  } catch (error) {
    res.json({success:false,message:error.message})
    }
  }

export {loginAdmin,addDoctor}