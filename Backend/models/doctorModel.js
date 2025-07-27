import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: { 
      type: String,
      required: false, // ❗ for dummy doctors
      unique: false,   // ❗ set to false so multiple dummy docs allowed
    },
    password: {
      type: String,
      required: false, // ❗ dummy doctors don’t login
    },
    image: {
      type: String,
      required: true,
    },
    speciality: {
      type: String,
      required: true,
    },
    degree: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
    fee: {
      type: Number,
      required: true,
    },
    address: {
      type: Object,
      required: false, // ❗ dummy can skip address
    },
    date: {
      type: Number,
      required: false, // ❗ dummy can skip
    },
    slots_booked: {
      type: Object,
      default: {},
    },
  },
  { minimize: false }
);

const doctorModel =
  mongoose.models.doctor || mongoose.model("doctor", doctorSchema);

export default doctorModel;
