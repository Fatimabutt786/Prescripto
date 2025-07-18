import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectcloudinary from './config/cloundinary.js'
import adminRouter from './routes/adminRoutes.js'
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoutes.js'

const app = express()
const port = process.env.PORT || 4000

connectDB()
connectcloudinary()

// ✅ CORRECT middleware setup
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173', // for local frontend
  credentials: true
}))

// ✅ Routes
app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)
app.use('/api/user', userRouter)

app.get('/', (req, res) => {
  res.send('API WORKING Great!')
})

app.listen(port, () => {
  console.log('Server Started on Port', port)
})
