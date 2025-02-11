const { query } = require("express");
const express = require("express");
const router = express.Router();

const db = require("../db/config/dbConfig");


// Create_Course
router.post("/create-course/", (req, res) => {
  try {
    const course_name = req.body.course_name;
    const duration = req.body.duration;

    var insertData = `INSERT INTO course (course_name,duration)
        VALUES ('${course_name}','${duration}')`;
    db.query(insertData, (error,results) => {
      if (error) {
        res.json({
          success: false,
          message: "Data Not Found",
        });
      } else {
        res.json({
          success: true,
          message: "Course Created Successfully",
          results
        });
      }
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Data Not Found",
      error,
    });
  }
});


// Course_List
router.get('/course-list/',(req,res)=>{
    try{
        var courseList = `SELECT * FROM course`;
        db.query(courseList, (error,results)=>{
            if(error){
                res.json({
                    success: false,
                    message: 'Data Not Found',
                    error
                })
            }else{
                res.json({
                    success: true,
                    message: 'All Course List',
                    results
                })
            }
            
        })
       

    }catch(error){
        res.json({
            success: false,
            error
        })
    }
})

module.exports = router;
