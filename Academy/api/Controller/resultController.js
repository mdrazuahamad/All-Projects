const { query } = require("express");
const express = require("express");
const router = express.Router();

const db = require("../db/config/dbConfig");

// Create_Course
router.post("/create", (req, res) => {
  try {
    const student_id = req.body.student_id;
    const result = req.body.result;
    const gpa = req.body.gpa;

    var insertData = `INSERT INTO result (student_id,result, gpa)
        VALUES (${student_id},'${result}', '${gpa}')`;
    db.query(insertData, (error, results) => {
      if (error) {
        res.json({
          success: false,
          message: "Data Not Found",
        });
      } else {
        res.json({
          success: true,
          message: "Result Created Successfully",
          results,           
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
router.get("/view", (req, res) => {
  const student_id = req.body.student_id;
  try {
    var courseList = `SELECT * FROM result WHERE student_id = ${student_id}`;
    var studentList = `SELECT * FROM student WHERE id = ${student_id}`;
    db.query(courseList, (error, results) => {
      if (error) {
        res.json({
          success: false,
          message: "Data Not Found",
          error,
        });
      } else {
        if (results.length == 0) {
            
        } else {
          db.query(studentList, (error, result) => {
            if (error) {
              res.json({
                success: false,
                message: "Data Not Found",
                error,
              });
            } else {
              res.json({
                success: true,
                message: "Data Found",
                results: result.map((v) => {
                  return {
                    name: v.student_name,
                    reg: v.reg,
                    roll: v.roll,
                    batch: v.batch,
                    course: v.course,
                    roll: v.roll,
                    result: results[0]?.result,
                    gpa: results[0]?.gpa,
                  };
                }),
              });
            }
          });
        }
      }
    });
  } catch (error) {
    res.json({
      success: false,
      error,
    });
  }
});

module.exports = router;
