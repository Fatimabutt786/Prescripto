import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectcloudinary from './config/cloundinary.js';
import adminRouter from './routes/adminRoutes.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoutes.js';

import DoctorModel from './models/doctorModel.js';

const app = express();
const port = process.env.PORT || 4000;

// ✅ Middleware
app.use(cors({
 origin: ['http://localhost:5173','http://localhost:5174'],
 credentials: true
}));
app.use(express.json());

// ✅ Routes
app.use('/api/admin', adminRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/user', userRouter);

app.get('/', (req, res) => {
  res.send('API Working ✅');
});

// ✅ START SERVER ONLY AFTER DB CONNECTS
connectDB().then(async () => {
  console.log("✅ MongoDB connected");

  // ⛔️ Delete doctors only ONCE if needed
  // await DoctorModel.deleteMany({});
  // console.log("❌ All doctors deleted");

  // await DoctorModel.insertMany(dummyDoctors);
  // console.log("✅ Dummy doctors inserted");

  // ✅ Cloudinary
  connectcloudinary();

  // ✅ Start server
  app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
  });
}).catch((err) => {
  console.error("❌ DB connection failed:", err);
});
