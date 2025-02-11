const express = require("express")


const connectDB = require('./db')

const app = express()




app.use((err,req,res,next) => {
    console.log(err)
    const status = err.status ? err.status:500;
    const message = err.message ? err.message: 'Server Error Occurred '
    res.status(status).json({message})
});

