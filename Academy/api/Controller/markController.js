const { query } = require("express");
const express = require("express");
const router = express.Router();

const db = require("../db/config/dbConfig");

// Mark_Sheet
router.post("/create/", (req, res) => {
  try {
    const obtain_mark = req.body.obtain_mark;
    const exam_id = req.body.exam_id;

    var insertData = `INSERT INTO mark (exam_id, obtain_mark, pass_mark, max_mark)
          VALUES (${exam_id},'${obtain_mark}', '33', '100')`;
    db.query(insertData, (error, results) => {
      if (error) {
        res.json({
          success: false,
          message: "Data not insert",
          error,
        });
      } else {
        res.json({
          success: true,
          message: "Mark Added Successfully",
          results,
        });
      }
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Went Wrong",
      error,
    });
  }
});

// Get Mark
router.post("/view/", (req, res) => {
  try {
    const student_id = req.body.student_id;
    const course_id = req.body.course_id;

    var insertData = `SELECT * FROM course WHERE student_id = ${student_id}`;
    var batchData = `SELECT * FROM batch WHERE student_id = ${course_id}`;
    var insertBatch = `SELECT * FROM batch`;
    db.query(insertData, (error, results) => {
      if (error) {
        res.json({
          success: false,
          message: "Data not insert",
          error,
        });
      } else {
        if (results.length > 0) {
          db.query(batchData, (error, result) => {
            if (error) {
              res.json({
                success: false,
                message: "Data not insert",
                error,
              });
            } else {
              res.json({
                success: true,
                message: "Course Found",
                result,
              });
            }
          });
        } else {
          res.json({
            success: false,
            message: "Data not insert",
            error,
          });
        }
      }
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Went Wrong",
      error,
    });
  }
});

module.exports = router;
