import doctorModel from "../models/doctorModel.js"
import bcryt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js"
import userModel from "../models/userModel.js"
const changeAvailability = async (req,res)=>{
try {
    const {docId} = req.body
    const docData = await doctorModel.findById(docId)
    await doctorModel.findByIdAndUpdate(docId,{available: !docData.available})
    res.json({success:true,message:"Availability change"})
} catch (error) {
    res.json({success:false,message:error.message})
}
}

const doctorList = async (req,res) =>{
    try {
     const doctors = await doctorModel.find({}).select(['-password','-email']) 
     res.json({success:true,doctors}) 
    } catch (error) {
         res.json({success:false,message:error.message})
    }
}

// api for doctor login
const loginDoctor = async (req,res) =>{
try {
    const {email,password} = req.body
    const doctor = await doctorModel.findOne({email})
    if(!doctor){
        return res.json({success:false,message:"Invalid Credentials"})

    }
    const isMatch = await bcryt.compare(password,doctor.password)
    if(isMatch){
    const token = jwt.sign({id:doctor._id},process.env.JWT_SECRET)

    res.json({success:true,token})

    }else{
      return res.json({success:false,message:"Invalid Credentials"})
    }

} catch (error) {
    res.json({success:false,message:error.message})
}
}

// api to get doctor appoibtment for doctor panel
const appointmentsDoctor = async (req,res) =>{
    try {
         const docId = req.docId
         const appointments = await appointmentModel.find({docId})
         res.json({success:true,appointments})
        
    } catch (error) {
           res.json({success:false,message:error.message})
    }
}
// cancel appointment
const appointmentCancel = async (req,res) =>{
try {
  
   const {appointmentId} = req.body
   const appointmentData = await appointmentModel.findById(appointmentId)

   await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})
  //  releasing doctor slot
  const {docId,slotDate,slotTime} = appointmentData
  const doctorData = await doctorModel.findById(docId)
  let slots_booked = doctorData.slots_booked
  slots_booked[slotDate] = slots_booked[slotDate].filter(e=> e!=slotTime)
  await doctorModel.findByIdAndUpdate(docId,{slots_booked})

  res.json({success:true,message:"Appointment canceled"})
  
} catch (error) {
   return res.json({ success: false, message: error.message });
}
}
// dashboard
// api to get dashboard data for admin panel
const doctorDashboard = async (req, res) => {
  try {
    const docId = req.docId; // set by authDoctor middleware

    // 1. Get all appointments of this doctor
    const appointments = await appointmentModel.find({ docId });

    // 2. Get unique user IDs from those appointments
    const uniqueUserIds = [
      ...new Set(appointments.map((a) => a.userId))
    ];

    // 3. Count users 
    const users = await userModel.find({ _id: { $in: uniqueUserIds } });

    const dashData = {
      appointments: appointments.length,
      patients: users.length,
      latestAppointments: [...appointments].reverse()
    };

    res.json({ success: true, dashData });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
//api to get doctor profile for doctor panel
const doctorProfile = async (req,res) =>{
    try {
      const docId = req.docId;
        console.log("Received docId:", docId);

        const profileData = await doctorModel.findById(docId).select('-password')
        console.log(profileData)
        res.json({success:true,profileData})
        
        
    } catch (error) {
         res.json({ success: false, message: error.message });
    }
}
// api to update doctor profile data
const updateDoctorProfile = async (req,res) =>{
  try {
     const docId = req.docId;
    const {fee,address,available} = req.body
    await doctorModel.findByIdAndUpdate(docId,{fee,address,available})
res.json({success:true,message:"Profile Updated"})
  } catch (error) {
      res.json({ success: false, message: error.message });
  }
}

export {changeAvailability,doctorList,loginDoctor,appointmentsDoctor,appointmentCancel,doctorDashboard,
  updateDoctorProfile,doctorProfile
}