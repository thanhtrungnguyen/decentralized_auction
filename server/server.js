const express = require('express')
const mongoose = require('mongoose');
require('dotenv').config()

const authRouter = require('./routers/auth')

const connectDB = async() =>{
    try {
        await mongoose.connect(`${process.env.MONGO_DB}`,{
        })
        console.log('MongoDB connected')
        
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

connectDB()

const app = express()

app.use(express.json())

app.use('/api/auth', authRouter)

const PORT = 5000

app.listen(PORT,()=>console.log(`server started on port ${PORT}`))