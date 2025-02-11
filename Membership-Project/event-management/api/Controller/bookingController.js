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
    callback(null, file.originalname);
  },
});
var upload = multer({ storage: myLocalstorage });

router.get("/", (req, res) => {
  try {
    res.json({
      success: true,
      message: "Simple Booking Call",
    });
  } catch (error) {
    res.json({
      success: false,
      error,
    });
  }
});

// Create New Booking
router.post("/create/", (req, res) => {
  try {
    const bookingId = Math.floor(1000000 * Math.random() + 9999999);
    const event_id = req.body.event_id;
    const user_id = req.body.user_id;
    const book_date = req.body.book_date;

    //check same event with user
    var checkExistingEventBooking = `SELECT * FROM event_bookings WHERE event_id='${event_id}' AND user_id='${user_id}' AND isDeleted='0'`;
    db.query(checkExistingEventBooking, (error, results) => {
      if (error) {
        res.json({
          success: false,
          error,
        });
      } else {
        if (results.length == 0) {
          //insert booking
          var insertBooking = `INSERT INTO event_bookings(booking_id,event_id, user_id, book_date, status, isDeleted)
          VALUES('${bookingId}','${event_id}', '${user_id}', '${book_date}', '0', '0')`;
          db.query(insertBooking, (error, results) => {
            if (error) {
              res.json({
                success: false,
                error,
              });
            } else {
              res.json({
                success: true,
                message:
                  "Event Booked Success, To Confirm Booking Proceed for payment via bookings page.",
              });
            }
          });
        } else {
          res.json({
            success: false,
            message: "Your Already Booked for This Event",
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

//Get booking details by id
router.get("/info/:bid", (req, res) => {
  try {
    const bid = req.params.bid;

    var checkExisting = `SELECT * FROM event_bookings WHERE booking_id='${bid}'`;

    db.query(checkExisting, (error, bookingResults) => {
      if (error) {
        res.json({
          success: false,
          error,
        });
      } else {
        if (bookingResults.length === 0) {
          res.json({
            success: false,
            message: "Booking Id not Found!",
          });
        } else {
          const userId = bookingResults[0].user_id;
          const eventId = bookingResults[0].event_id;

          var getUserDetailsById = `SELECT * FROM users WHERE user_id='${userId}'`;

          db.query(getUserDetailsById, (error, userDetails) => {
            if (error) {
              res.json({
                success: false,
                message: "User Details not Found!",
              });
            } else {
              var getEventByEventId = `SELECT * FROM events_list WHERE event_id='${eventId}'`;

              db.query(getEventByEventId, (error, eventDetails) => {
                if (error) {
                  res.json({
                    success: false,
                    message: "Event Details not Found!",
                  });
                } else {
                  res.json({
                    success: true,
                    bookingResults,
                    userDetails,
                    eventDetails,
                  });
                }
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

//get list of same event bookings
router.get("/info/event/:eid", (req, res) => {
  try {
    const eid = req.params.eid;

    var checkExisting = `SELECT * FROM event_bookings WHERE event_id='${eid}'`;

    db.query(checkExisting, (error, bookingResults) => {
      if (error) {
        res.json({
          success: false,
          error,
        });
      } else {
        if (bookingResults.length === 0) {
          res.json({
            success: false,
            message: "Booking On Event not Found!",
          });
        } else {
          var output = [];
          for (let i = 0; i < bookingResults.length; i++) {
            const userId = bookingResults[i].user_id;
            const booking_id = bookingResults[i].booking_id;

            var getUserDetailsById = `SELECT * FROM users WHERE user_id='${userId}'`;

            db.query(getUserDetailsById, (error, userDetails) => {
              if (error) {
                output.push(error[0]);
              } else {
                output.push(userDetails[0]);
              }
            });

            var bookingdetailsById = `SELECT * FROM event_bookings WHERE booking_id='${booking_id}'`;

            db.query(bookingdetailsById, (error, BookDetails) => {
              if (error) {
                output.push(error[0]);
              } else {
                output.push(BookDetails[0]);
              }
            });
          }
          res.json({
            success: true,
            bookings: output,
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

// Upload an Image
router.post("/upload/", upload.single("myImage"), (req, res) => {
  try {
    res.json({
      success: true,
      message: "File Uploaded Success",
    });
  } catch (error) {
    res.json({
      success: false,
      error,
    });
  }
});

module.exports = router;
