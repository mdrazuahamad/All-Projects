const { query } = require("express");
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const db = require("../Db/config/dbConfig");

// router.post("/create/", (req, res) => {
//   try {
//     const userid = Math.floor(100000 * Math.random() + 999999);
//     const userEmail = req.body.userEmail;
//     const userMobile = req.body.userMobile;
//     const userPassword = req.body.userPassword;

//     // CheckExisting User
//     var checkExisting = `SELECT * FROM users WHERE user_email = '${userEmail}`                      
//       if (err) {
//         res.json({
//           success: false,
//           message: "User Already Exist",
//           err
//         });
//       }else {
//         if (result.length ==0) {
//           //insert user
//           var insertData = `INSERT INTO users(user_id, user_name, user_email, user_mobile,user_password)
//                 VALUES(${userid},'${userName}','${userEmail}','${userMobile}','${userPassword}')`;

//           db.query(insertData, (error, result) => {
//             if (error) {
//               res.json({
//                 success: false,
//                 error,
//                 message: "Data Not Found",
//               });
//             } else {
//               res.json({
//                 success: true,
//                 message: "User Registered Successfully",
//                 result,
//               });
//             }
//           });
//         } else {
//           res.json({
//             success: false,
//             message: "User Already registered, try to login",
//           });
//         }
//       }
//     });
//   } catch (error) {
//     res.json({
//       success: false,
//       message: "Something Went Wrong",
//       error,
//     });
//   }
// });

// // // Create new User
router.post("/creates/", (req, res) => {
  function validateEmail(email) {
    // Regular expression for basic email validation
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  }
  try {
    const userid = Math.floor(1000000 * Math.random() + 9999999);
    const userName = req.body.userName;
    const userEmail = req.body.userEmail;
    const userMobile = req.body.userMobile;
    const userPassword = req.body.userPassword;
    const validEmail = validateEmail(userEmail);
    // check existing user
    var checkExisting = `SELECT * FROM users WHERE user_email='${userEmail}'`;
    if (validEmail) {
      db.query(checkExisting, (error, results) => {
        if (error) {
          res.json({
            success: false,
            error,
            message: "Data Not Found",
          });
        } else {
          if (results.length == 0) {
            //insert user
            var insertData = `INSERT INTO users(user_id, user_name, user_email, user_mobile,user_password)
                  VALUES(${userid},'${userName}','${userEmail}','${userMobile}','${userPassword}')`;

            db.query(insertData, (error, results) => {
              if (error) {
                res.json({
                  success: false,
                  error,
                  message: "Data Not Found",
                });
              } else {
                res.json({
                  success: true,
                  message: "User Registered Successfully",
                  results,
                });
              }
            });
          } else {
            res.json({
              success: false,
              message: "User Already registered, try to login",
            });
          }
        }
      });
    } else {
      res.json({
        success: false,
        message: "Invalid Email, Please provide correction email address",
      });
    }
  } catch (error) {
    res.json({
      success: false,
      error,
    });
  }
});

//Check Auth
router.post("/auth/", (req, res) => {
  try {
    let tokenHeader = process.env.TOKEN_HEADER_KEY;
    let tokenSecrete = process.env.JWT_SECRET_KEY;

    // validate the token
    const token = req.header(tokenHeader);
    const verified = jwt.verify(token, tokenSecrete);

    if (verified) {
      const userid = verified.user_id;
      var checkExisting = `SELECT * FROM users WHERE 	user_id='${userid}'`;
      db.query(checkExisting, (error, results) => {
        if (error) {
          res.json({
            success: false,
            error,
          });
        } else {
          if (results.length != 0) {
            res.json({
              success: true,
              user: results,
              message: "InSession",
            });
          } else {
            res.status(404).json({
              success: false,
              message: "User Not Found!, try again!",
            });
          }
        }
      });
    } else {
      res.json({
        success: false,
        message: "OutSession",
      });
    }
  } catch (error) {
    res.json({
      success: false,
      error,
    });
  }
});

// User Login
router.post("/login/", (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    var checkUserInDb = `SELECT * FROM users WHERE user_email='${username}'`;
    db.query(checkUserInDb, (error, results) => {
      if (error) {
        res.json({
          success: false,
          error,
        });
      } else {
        if (results.length != 0) {
          const dbPassword = results[0].user_password;
          const userId = results[0].user_id;
          if (dbPassword == password) {
            let jwtSecretKey = process.env.JWT_SECRET_KEY;
            let sessionData = {
              time: Date(),
              username: username,
              user_id: userId,
            };
            const token = jwt.sign(sessionData, jwtSecretKey, {
              expiresIn: process.env.JWT_TOKEN_EXPIRES,
            });
            res.json({
              success: true,
              message: "Login Success",
              token: token,
            });
          } else {
            res.json({
              success: false,
              message: "Wrong password!, try again!",
            });
          }
        } else {
          res.json({
            success: false,
            message: "User Not Registred!, try again!",
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
