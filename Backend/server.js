import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectcloudinary from './config/cloundinary.js'
import adminRouter from './routes/adminRoutes.js'
// app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectcloudinary()
// middlewares
app.use(express.json())
app.use(cors())

// api endpoint
app.use('/api/admin',adminRouter)
// localhost:4000/api/admin/adddoctor

app.get('/',(req,res)=>{
    res.send('API WORKING Greate!')
})

app.listen(port,(req,res)=>{
   console.log("Server Started",port) 
})