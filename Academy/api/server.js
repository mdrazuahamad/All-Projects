const express = require("express");

const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");


const studentController = require('./Controller/studentController')

const batchController = require('./Controller/batchController')

const courseController = require('./Controller/courseController')
const resultController = require('./Controller/resultController')
const markController = require('./Controller/markController')



var app = express();

app.listen(process.env.PORT, () => {
  console.log(`Hey Im Working at ${process.env.PORT}`);
});

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use("/student/",studentController)
app.use("/batch/", batchController)
app.use("/course/", courseController)
app.use("/results/", resultController)
app.use("/mark/", markController)