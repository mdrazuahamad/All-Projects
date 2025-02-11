const express = require("express");

const db = require("../config/dbConfig");

var router = express.Router();

// file upload code
var multer = require("multer");
var myLocalstorage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./images");
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + "" + file.originalname);
  },
});
var upload = multer({ storage: myLocalstorage });

router.get("/", (req, res) => {
  try {
    res.json({
      success: true,
      message: "Simple Event Call",
    });
  } catch (error) {
    res.json({
      success: false,
      error,
    });
  }
});

// Create An Event
router.post("/create/", upload.single("myImage"), (req, res) => {
  try {
    const event_id = Math.floor(10000 * Math.random() + 99999);
    const event_name = req.body.event_name;
    const amount = req.body.amt;
    const event_date = req.body.event_date;
    const event_desc = req.body.event_desc;
    const event_status = req.body.event_status;
    const event_deleted = req.body.event_deleted;
    const event_image = req.file.path;

    var sql = `INSERT INTO events_list(event_id,event_name,event_amount,event_date,event_description,event_image,status,isDeleted) 
    VALUES ('${event_id}','${event_name}','${amount}','${event_date}','${event_desc}','${event_image}','${event_status}','${event_deleted}')`;

    db.query(sql, (err, results) => {
      if (err) {
        res.json({
          success: false,
          message: "Data Not inserted",
          err,
        });
      } else {
        res.json({
          success: true,
          message: "Event Created Success",
          results,
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

// Update
router.put("/update/", (req, res) => {
  try {
    const event_id = req.body.event_id;
    const event_name = req.body.event_name;
    const amount = req.body.amt;
    const event_date = req.body.event_date;
    const event_desc = req.body.event_desc;
    const event_status = req.body.event_status;
    const event_deleted = req.body.event_deleted;

    //checking the existing
    var checkExisting = `SELECT * FROM events_list WHERE event_id='${event_id}'`;

    db.query(checkExisting, (error, results) => {
      if (error) {
        res.json({
          success: false,
          error,
        });
      } else {
        if (results.length === 0) {
          res.json({
            success: false,
            message: "Event Id not Found!, Not Updated",
          });
        } else {
          var updateData = `UPDATE events_list SET 
          event_name = '${event_name}',
          event_amount = '${amount}',
          event_date = '${event_date}',
          event_description = '${event_desc}',
          status = ${event_status},
          isDeleted = ${event_deleted} WHERE event_id = '${event_id}'`;

          db.query(updateData, (error, results) => {
            if (error) {
              res.json({
                success: false,
                error,
              });
            } else {
              res.json({
                success: true,
                message: "Data Updated Success",
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

// Delete
router.delete("/delete/:eventid", (req, res) => {
  try {
    const eventid = req.params.eventid;

    //checking the existing
    var checkExisting = `SELECT * FROM events_list WHERE event_id='${eventid}'`;

    db.query(checkExisting, (error, results) => {
      if (error) {
        res.json({
          success: false,
          error,
        });
      } else {
        if (results.length === 0) {
          res.json({
            success: false,
            message: "Event Id not Found!, Not Deleted",
          });
        } else {
          var deleteOne = `DELETE FROM events_list WHERE event_id='${eventid}'`;
          db.query(deleteOne, (error, results) => {
            if (error) {
              res.json({
                success: false,
                message: "Event is not deleted",
                error,
              });
            } else {
              res.json({
                success: true,
                message: "Event is Deleted Success",
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

// Event By Id
router.get("/event/:eventid", (req, res) => {
  try {
    const eventid = req.params.eventid;

    var checkExisting = `SELECT * FROM events_list WHERE event_id='${eventid}'`;

    db.query(checkExisting, (error, results) => {
      if (error) {
        res.json({
          success: false,
          error,
        });
      } else {
        if (results.length === 0) {
          res.json({
            success: false,
            message: "Event Id not Found!",
          });
        } else {
          res.json({
            success: true,
            results,
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

//get list of events
router.get("/list/", (req, res) => {
  try {
    var listEvents = `SELECT * FROM events_list`;
    db.query(listEvents, (error, results) => {
      if (error) {
        res.json({
          success: false,
          error,
        });
      } else {
        if (results.length === 0) {
          res.json({
            success: false,
            message: "No Events",
          });
        } else {
          res.json({
            success: true,
            results,
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
