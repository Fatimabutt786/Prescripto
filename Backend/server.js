import express from 'express'
import cors from 'cors'
import 'dotenv/config'

// app config
const app = express()
const port = process.env.PORT || 4000

// middlewares
app.use(express.json())
app.use(cors())

// api endpoint
app.get('/',(req,res)=>{
    res.send('API WORKING Greate!')
})

app.listen(port,(req,res)=>{
   console.log("Server Started",port) 
})