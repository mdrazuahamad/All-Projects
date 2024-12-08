const express = require("express")
const dotenv = require("dotenv")
dotenv.config();
const cors= require("cors")

const courseController = require("./Controller/courseController")
const batchController = require("./Controller/batchController")
const studentController = require("./Controller/studentController")
const userController = require("./Controller/userController")



var app = express()

app.listen(process.env.PORT,() =>{
    console.log(`Hey Im  PORT at ${process.env.PORT}`);
    
})

app.use(
    cors({
        origin:"*",
    })
)
app.use(express.json());
app.use("/course/", courseController)
app.use("/batch", batchController)
app.use("/student", studentController)
app.use("/user", userController)