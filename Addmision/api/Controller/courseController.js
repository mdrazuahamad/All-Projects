const { query } = require("express");
const express = require("express");
const db = require("../Db/config/dbConfig");
const router = express.Router();

// Create_Course

router.post("/create/", (req, res) => {
  try {
    const course_name = req.body.course_name;
    const course_desc = req.body.course_desc;
    const duration = req.body.duration;
    const start_date = req.body.start_date;
    const end_date = req.body.end_date;
    const fees = req.body.fees;

    var existingCourse = `SELECT * FROM courses WHERE course_name = '${course_name}'`;
    db.query(existingCourse, (error, result) => {
      if (error) {
        res.json({
          success: false,
          message: "Data Not Found",
          error,
        });
      } else {
        if(result.length == 0) {
          var insertData = `INSERT INTO courses (course_name, course_desc, duration, start_date, end_date, fees) 
                VALUES ('${course_name}','${course_desc}','${duration}','${start_date}','${end_date}', '${fees}')`;
          db.query(insertData, (error, results) => {
            if (error) {
              res.json({
                success: false,
                message: "Course Not Created",
                error,
              });
            } else {
              res.json({
                success: true,
                message: "Course Created Successfully",
                results,
              });
            }
          });
        }else{
            res.json({
                success:false,
                message:'Course Already Existed'
            })
        }
      }
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Something Went Wrong",
      error,
    });
  }
});

// Course_List
router.get("/course-list", (req, res) => {
  try {
    var getAllCourse = `SELECT * FROM courses`;
    db.query(getAllCourse, (error, result) => {
      if (error) {
        res.json({
          success: false,
          message: "Course List Not Found",
          error,
        });
      } else {
        res.json({
          success: true,
          message: "Course List Found",
          result,
        });
      }
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Something Went Wrong",
    });
  }
});

// Single_Course
router.post("/single-course", (req, res) => {
  try {
    const course_name = req.body.course_name;
    var singleCourse = `SELECT * FROM courses WHERE course_name ='${course_name}'`;
    db.query(singleCourse, (error, result) => {
      if (error) {
        res.json({
          success: false,
          message: "Single Course Not Found",
          error,
        });
      } else {
        if (result.length==0) {
          res.json({
            success:false,
            message:'Data Not Found'
          })
        } else {
          res.json({
            success: true,
            message: "Single Course Found",
            result,
          });
        }

      }
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Something Went Wrong",
    });
  }
});

module.exports = router;
