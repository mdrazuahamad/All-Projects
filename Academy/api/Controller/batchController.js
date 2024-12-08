const { query } = require("express");
const express = require("express");

const db = require("../db/config/dbConfig");

const router = express.Router();

// batch_Created
router.post("/batch-create/", (req, res) => {
  try {
    const batch_name = req.body.batch_name;
    const year = req.body.year;

    var batchExiting = `SELECT * FROM batch WHERE batch_name = '${batch_name}'AND year ='${year}'`;
    db.query(batchExiting, (error, results) => {
      if (error) {
        res.json({
          success: false,
          error,
        });
      } else {
        if (results.length == 0) {
          var insertData = `INSERT INTO batch ( batch_name, year)
          VALUES ('${batch_name}','${year}')`;
          db.query(insertData, (err, results) => {
            if (err) {
              res.json({
                success: false,
                message: "Data Not Found",
                err,
              });
            } else {
              res.json({
                success: true,
                message: "Batch Created Successfully",
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

// Batch_List
router.get("/batch-list/", (req, res) => {
  try {
    var batchList = `SELECT * FROM batch`;
    db.query(batchList, (error, results) => {
      if (error) {
        res.json({
          success: false,
          error,
        });
      }else{
        res.json({
            success: true,
            message: "Batch List",
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
