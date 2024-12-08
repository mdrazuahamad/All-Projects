const { query } = require("express");
const express = require("express");
const db = require("../Db/config/dbConfig");
const router = express.Router();

// Create Student
router.post("/create/", (req, res) => {
  try {
    const reg = req.body.reg;
    const roll = req.body.roll;
    const name = req.body.name;
    const mobile_no = req.body.mobile_no;
    const address = req.body.address;

    var insertStudent = `INSERT INTO student (reg, roll, name, mobile_no, adderess) 
        VALUES ('${reg}','${roll}','${name}','${mobile_no}','${address}')`;

    db.query(insertStudent, (error, result) => {
      if (error) {
        res.json({
          success: false,
          message: "Not Insert",
          error,
        });
      } else {
        res.json({
          success: true,
          message: "Data Insert",
          result,
        });
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

router.post("/get-data", (req, res) => {
    const courseId = req.body.course_id
  try {
    var inserdata = `SELECT * FROM student WHERE course_id = ${id}`;

    db.query(inserdata, (error, result) => {
      if (error) {
        res.json({
          success: false,
          message: "NO Data Found",
          error,
        });
      } else {
        res.json({
          success: true,
          message: "Data Found",
          result,
        });
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
module.exports = router;
