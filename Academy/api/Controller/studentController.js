const { query } = require("express");
const express = require("express");

const db = require("../db/config/dbConfig");

const router = express.Router();



  
// Student_Created
router.post("/student-create/", (req, res) => {
  try {
    const photo = req.body.photo;
    const reg = req.body.reg;
    const roll = req.body.roll;
    const student_name = req.body.student_name;
    const batch = req.body.batch;
    const course = req.body.course;
    const nid = req.body.nid;
    const mobile_no = req.body.mobile_no;
    const gmail = req.body.gmail;
    const address = req.body.address;

    var checkExiting = `SELECT * FROM student WHERE gmail = '${gmail}'`;
    db.query(checkExiting, (error, results) => {
      if (error) {
        res.json({
          success: false,
          error,
        });
      } else {
        if (results.length == 0) {
          var insertData = `INSERT INTO student ( photo, reg, roll, student_name, batch, course, nid, mobile_no,gmail,address)
          VALUES ('${photo}','${reg}','${roll}', '${student_name}', '${batch}', '${course}', '${nid}', '${mobile_no}','${gmail}','${address}')`;
          db.query(insertData, (err, results) => {
            if (err) {
              res.json({
                success: false,
                message: "Data Not inserted",
                err,
              });
            } else {
              res.json({
                success: true,
                message: "Student Created Success",
                results,
              });
            }
          });
        } else {
          res.json({
            success: true,
            message: "Data Already Exist",
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


// Student_List
router.get("/student-list/", (req, res) => {
  try {
    var allStudent = `SELECT * FROM student`;
    db.query(allStudent , (error, results) => {
      if (error) {
        res.json({
          success: false,
          error,
        });
      }else {
          res.json({
            success: true,
            results
          });
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
