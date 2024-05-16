import express from 'express'
import  mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import listingRouter from './routes/listing.route.js'
import path from 'path'
import  cors from 'cors'

import cookieParser  from 'cookie-parser'
dotenv.config()


  
mongoose.connect(process.env.MONGO).then(()=>{
    console.log('connected to mongodb!!s')
}).catch((err)=>{
    console.log(err)
})
const __dirname = path.resolve()
const app =express();
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.listen(8000,()=>{
    console.log('server is running on port 8000')
})
app.use('https://real-estate-4rd4.onrender.com/api/user',userRouter);
app.use('https://real-estate-4rd4.onrender.com/api/auth',authRouter);
app.use('https://real-estate-4rd4.onrender.com/api/listing',listingRouter);
app.use(express.static(path.join(__dirname,'/client/dist')))
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'client',  'dist', 'index.html'))
})

app.use((err,req,res,next)=>{
        const statusCode = err.statusCode || 500;
        const message = err.message || 'internal server Error'
        return res.status(statusCode).json({
            success : false,
            statusCode,
            message
        })
})
