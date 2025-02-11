const Razorpay = require("razorpay");

const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config();

const express = require("express");

const db = require("../config/dbConfig");

var router = express.Router();

const crypto = require("crypto");

const instance = new Razorpay({
  key_id: process.env.RAZOR_PAY_KEY_ID,
  key_secret: process.env.RAZOR_PAY_KEY_SECRET,
});

router.post("/order/", (req, res) => {
  try {
    let tokenHeader = process.env.TOKEN_HEADER_KEY;
    let tokenSecrete = process.env.JWT_SECRET_KEY;

    // validate the token
    const token = req.header(tokenHeader);
    const verified = jwt.verify(token, tokenSecrete);

    if (verified) {
      const userID = verified.user_id;
      const options = {
        amount: req.body.amount * 100,
        currency: "INR",
        receipt: Math.floor(100000 * Math.random() + 999999),
      };

      instance.orders.create(options, (error, payResults) => {
        if (error) {
          res.json({
            success: false,
            error,
          });
        } else {
          //insert payment with order id
          var insertQuery = `INSERT INTO payments(user_id, event_id, order_id, payment_id, payment_sign, amount, pay_status, pay_reason)
          VALUES('${userID}', '${req.body.event_id}', '${
            payResults.id
          }', '', '', '${payResults.amount / 100}', '0','Success')`;
          db.query(insertQuery, (error, results) => {
            if (error) {
              res.json({
                success: false,
                massage: "Order Created Success, But Not Processed, Try Again!",
                err,
              });
            } else {
              const order_status = {
                user_id: userID,
                order_id: payResults.id,
                order_amount: payResults.amount,
                order_created: true,
                message: "Order Created and Processed",
              };
              res.json({
                success: true,
                order_status,
              });
            }
          });
        }
      });
    } else {
      res.json({
        success: false,
        error,
      });
    }
  } catch (error) {
    res.json({
      success: false,
      error,
    });
  }
});

router.post("/verify/", (req, res) => {
  const razorpay_payment_id = req.body.payment_id;
  const razorpay_order_id = req.body.order_id;
  const razorpay_signature = req.headers["x-razorpay-signature"];
  const user_order_id = req.body.user_order_id;

  let hmac = crypto.createHmac("sha256", process.env.RAZOR_PAY_KEY_SECRET);
  hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
  const generated_signature = hmac.digest("hex");

  if (razorpay_signature === generated_signature) {
    //update pay details
    var payDetails = `UPDATE payments SET payment_id='${razorpay_payment_id}', payment_sign='${razorpay_signature}', pay_status='1' 
    WHERE order_id='${razorpay_order_id}'`;
    db.query(payDetails, (error, results) => {
      if (error) {
        res.json({
          success: false,
          error,
        });
      } else {
        var statusUpdateQuery = `UPDATE event_bookings SET status='1' WHERE booking_id='${user_order_id}'`;
        db.query(statusUpdateQuery, (error, results) => {
          if (error) {
            res.json({
              success: false,
              error,
            });
          } else {
            res.json({
              success: true,
              message: "Payment Success",
              pay_details: {
                payment_id: razorpay_payment_id,
                order_id: razorpay_order_id,
              },
            });
          }
        });
      }
    });
  } else {
    res.json({
      success: false,
      message: "Payment Faild",
    });
  }
});

router.post("/failed/", (req, res) => {
  try {
    const description = req.body.description;
    const orderId = req.body.order_id;
    const payment_id = req.body.payment_id;
    const paycode = req.body.code;
    var updateFailed = `UPDATE payments SET payment_id='${payment_id}', pay_reason="${description}", payment_sign='${paycode}' WHERE order_id='${orderId}'`;
    db.query(updateFailed, (error, results) => {
      if (error) {
        res.json({
          success: false,
          error,
        });
      } else {
        const failed = {
          code: paycode,
          description: description,
          payment_id: payment_id,
        };
        res.json({
          success: true,
          failed,
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

//get list of payment
router.get("/paymentlist/", (req, res) => {
  try {
    let tokenHeader = process.env.TOKEN_HEADER_KEY;
    let tokenSecrete = process.env.JWT_SECRET_KEY;

    // validate the token
    const token = req.header(tokenHeader);
    const verified = jwt.verify(token, tokenSecrete);
    if (verified) {
      var userList = `SELECT * FROM payments`;
      db.query(userList, (error, results) => {
        if (error) {
          res.json({
            success: false,
            error,
          });
        } else {
          if (results.length === 0) {
            res.json({
              success: false,
              message: "No Payment Found",
            });
          } else {
            res.json({
              success: true,
              results,
              total: results?.length
            });
          }
        }
      });
    } else {
      res.json({
        success: false,
        error,
      });
    }
  } catch (error) {
    res.json({
      success: false,
      error,
    });
  }
});
//get list of payment
router.get("/paymentlist/", (req, res) => {
  try {
    let tokenHeader = process.env.TOKEN_HEADER_KEY;
    let tokenSecrete = process.env.JWT_SECRET_KEY;

    // validate the token
    const token = req.header(tokenHeader);
    const verified = jwt.verify(token, tokenSecrete);
    if (verified) {
      var userList = `SELECT * FROM payments`;
      db.query(userList, (error, results) => {
        if (error) {
          res.json({
            success: false,
            error,
          });
        } else {
          if (results.length === 0) {
            res.json({
              success: false,
              message: "No Payment Found",
            });
          } else {
            res.json({
              success: true,
              results,
              total: results?.length,
            });
          }
        }
      });
    } else {
      res.json({
        success: false,
        error,
      });
    }
  } catch (error) {
    res.json({
      success: false,
      error,
    });
  }
});
module.exports = router;
