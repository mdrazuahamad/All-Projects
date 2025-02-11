const { query } = require("express");
const express = require("express");
const jwt = require("jsonwebtoken");

const db = require("../config/dbConfig");

var router = express.Router();

router.get("/", (req, res) => {
  try {
    res.json({
      success: true,
      message: "Simple User Call",
    });
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
      var checkExisting = `SELECT * FROM users WHERE 	user_id='${userid}' AND isDeleted='0'`;
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

// Create new User
router.post("/create/", (req, res) => {
  try {
    const userid = Math.floor(1000000 * Math.random() + 9999999);
    const userName = req.body.userName;
    const userEmail = req.body.userEmail;
    const userMobile = req.body.userMobile;
    const memberType = req.body.memberType;
    const membershipNumber = req.body.membershipNumber;
    const haveGuest = req.body.haveGuest;
    const userRole = req.body.userRole;
    const createdDate = req.body.createdDate;
    const payment = req.body.payment;
    const userPassword = req.body.userPassword;
    const guestName = req.body.guestName;
    const relation = req.body.relation;
    const gender = req.body.gender;
    const age = req.body.age;

    // check existing user
    var checkExisting = `SELECT * FROM users WHERE user_email='${userEmail}' AND isDeleted='0'`;
    db.query(checkExisting, (error, results) => {
      if (error) {
        res.json({
          success: false,
          error,
        });
      } else {
        if (results.length == 0) {
          //insert user
          var insertData = `INSERT INTO users(user_id, user_name, user_email, user_mobile, member_type, membership_number, have_guest, user_password, user_role, create_date, payment, status, isDeleted)
                VALUES(${userid},'${userName}','${userEmail}','${userMobile}', ${memberType}, ${membershipNumber}, ${haveGuest}, '${userPassword}', '${userRole}', '${createdDate}', ${payment}, '0','0')`;
          var insertguest = `INSERT INTO guests(user_id, guest_name, relation, gender, age)
                VALUES(${userid},'${guestName}','${relation}','${gender}', ${age})`;
          db.query(insertData, (error, results) => {
            if (error) {
              res.json({
                success: false,
                error,
              });
            } else {
              if (req.body.haveGuest === 1) {
                db.query(insertguest, (error, results) => {
                  if (error) {
                    res.json({
                      success: false,
                      error,
                    });
                  } else {
                    res.json({
                      success: true,
                      message: "User Registered Success.",
                    });
                  }
                });
              } else {
                res.json({
                  success: true,
                  message: "User Registered Success.",
                });
              }
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
  } catch (error) {
    res.json({
      success: false,
      error,
    });
  }
});

// router.post("/create", (req, res) =>{
//   try{
//     const userid = Math.floor(1000000 * Math.random() + 9999999);
//     const userName = req.body.user_name;
//     const userEmail = req.body.user_email;
//     const userMobile = req.body.user_mobile;
//     const memberType = req.body.member_type;
//     const membershipNumber = req.body.membership_number;
//     const haveGuest = req.body.have_guest;
//     const userRole = req.body.user_role;
//     const createdDate = req.body.create_date;
//     const payment = req.body.payment;
//     const userPassword = req.body.user_password;
//     const guestName = req.body.guestName;
//     const relation = req.body.relation;
//     const gender = req.body.gender;
//     const age = req.body.age;
    
//     // var checkExisting = `SELECT * FROM registerpage WHERE user_email = '${userEmail}' AND isDeleted='0'`;
//     db.query(checkExisting, (error, results) => {
//       if(error){
//         res.json({
//           success:false,
//           error,
//         });
//       }else{
//         if(results.length ==0){
//           var insertData = `INSERT INTO registerpage(user_id,user_name,user_email,user_mobile,member_type,membership_number,have_guest,user_password,user_role,status,create_date,payment,isDeleted)
//           VALUES(${userid}, '${userName}', '${userEmail}',${userMobile}, ${memberType}, ${membershipNumber},${haveGuest},'${userPassword}','${userRole}', '0','${createdDate}',${payment}, '0')`;

//           var insertguest = `INSERT INTO guests(user_id, guest_name, relation, gender, age)
//           VALUES(${userid},'${guestName}','${relation}','${gender}',${age})`;
//           db.query(insertData, (error, results) => {
//             if(error){
//               res.json({
//                 success:false,
//                 error,
//               });
//             }else{
//               if(req.body.haveGuest === 1){
//                 db.query(insertguest, (error, results) => {
//                   if(error){
//                     res.json({
//                       success:false,
//                       error,
//                     });
//                   }else{
//                     res.json({
//                       success:true,
//                       message:"User Registered Success."
//                     });
//                   }
//                 });
//               }else{
//                 res.json({
//                   success:true,
//                   message:"User Registered Success.",
//                 })
//               }
//             }
//           });
//         }else{
//           res.json({
//             success:false,
//             message:"User Already registered, try to login",
//           });
//         }
//       }
//     });
//   }catch(error){
//     res.json({
//       success:false,
//       error,
//     });
//   }
// });


//Create Subscribe User Package
router.post("/userList/", (req, res) => {
  try {
    const user_id = req.body.user_id;
    const subscriber_id = req.body.subscriber_id;
    const user_name = req.body.user_name;
    const package_name = req.body.package_name;
    const package_duration = req.body.package_duration;
    const paid_amount = req.body.paid_amount;

    var sql = `INSERT INTO subscriber_list (user_id, subscriber_id, user_name, package_name, package_duration, paid_amount)
    VALUES (${user_id}, ${subscriber_id}, '${user_name}','${package_name}','${package_duration}','${paid_amount}')`;
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
          message: "Package Created Success",
          results,
        });
      }
    });
  } catch (error) {
    res.json({
      success: false,
      error,
      jjj: "hello"
    });
  }
});

//Create Subscribe Package list
router.post("/create-package/", (req, res) => {
  try {
    const event_id = req.body.event_id;
    const acive_package = req.body.acive_package;
    const package_amount = req.body.package_amount;
    const package_validity = req.body.package_validity;

    var sql = `INSERT INTO package_list (event_id, acive_package, package_amount, package_validity)
    VALUES (${event_id}, '${acive_package}','${package_amount}','${package_validity}')`;

    var sql1 = `SELECT * FROM package_list`
    db.query(sql, (err, results) => {
      if (err) {
        res.json({
          success: false,
          message: "Data Not inserted",
          err,
        });
      } else {
        db.query(sql1, (err, results) => {
          res.json({
            success: true,
            message: "Package Created Success",
            results,
          });
        })
      }
    });
  } catch (error) {
    res.json({
      success: false,
      error,
    });
  }
});
//Create Subscribe Package list
router.get("/package-list/", (req, res) => {
  try {
    var sql1 = `SELECT * FROM package_list WHERE package_validity <= 30 AND package_amount <= 200 OR event_id =2`
    db.query(sql1, (err, results) => {
      if (err) {
        res.json({
          success: false,
          message: "Data Not inserted",
          err,
        });
      } else {
        res.json({
          success: true,
          message: "Data Found",
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

// Update User [Auth]
router.put("/update/", (req, res) => {
  try {
    const userName = req.body.userName;
    const userEmail = req.body.userEmail;
    const userMobile = req.body.userMobile;
    const userStatus = req.body.userStatus;

    let tokenHeader = process.env.TOKEN_HEADER_KEY;
    let tokenSecrete = process.env.JWT_SECRET_KEY;

    // validate the token
    const token = req.header(tokenHeader);
    const verified = jwt.verify(token, tokenSecrete);

    if (verified) {
      // check existing user
      const userid = verified.user_id;
      var checkExisting = `SELECT * FROM users WHERE 	user_id='${userid}' AND isDeleted='0'`;
      db.query(checkExisting, (error, results) => {
        if (error) {
          res.json({
            success: false,
            error,
          });
        } else {
          if (results.length != 0) {
            //update user
            var updateData = `UPDATE users SET user_name='${userName}', user_email='${userEmail}', user_mobile='${userMobile}', status='${userStatus}' WHERE user_id='${userid}'`;
            db.query(updateData, (error, results) => {
              if (error) {
                res.status(400).json({
                  success: false,
                  error,
                });
              } else {
                res.status(200).json({
                  success: true,
                  message: "User Updated Success.",
                });
              }
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
      res.status(401).json({
        success: false,
        message: "User Not Have Access",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
});

// delete User
router.delete("/delete/:userid", (req, res) => {
  try {
    const userid = req.params.userid;
    // check existing user
    var checkExisting = `SELECT * FROM users WHERE user_id='${userid}' AND isDeleted='0'`;
    db.query(checkExisting, (error, results) => {
      if (error) {
        res.json({
          success: false,
          error,
        });
      } else {
        if (results.length != 0) {
          //update user
          var updateData = `UPDATE users SET isDeleted='1' WHERE user_id='${userid}'`;
          db.query(updateData, (error, results) => {
            if (error) {
              res.json({
                success: false,
                error,
              });
            } else {
              res.json({
                success: true,
                message: "User Deleted Success.",
              });
            }
          });
        } else {
          res.json({
            success: false,
            message: "User Not Found!, try again!",
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

// get user by id
router.get("/details/:userid", (req, res) => {
  try {
    const userid = req.params.userid;
    // check existing user
    var checkExisting = `SELECT * FROM users WHERE user_id='${userid}' AND isDeleted='0'`;
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
            results,
          });
        } else {
          res.json({
            success: false,
            message: "User Not Found!, try again!",
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

// user login
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

router.get("/events/", async (req, res) => {
  try {
    let tokenHeader = process.env.TOKEN_HEADER_KEY;
    let tokenSecrete = process.env.JWT_SECRET_KEY;

    // validate the token
    const token = req.header(tokenHeader);
    const verified = jwt.verify(token, tokenSecrete);

    if (verified) {
      var userId = verified.user_id;

      const fetchEventDetails = async (eventId) => {
        return new Promise((resolve, reject) => {
          var getEventByEventId = `SELECT * FROM events_list WHERE event_id='${eventId}'`;
          db.query(getEventByEventId, (error, eventDetails) => {
            if (error) {
              reject(error);
            } else {
              resolve(eventDetails);
            }
          });
        });
      };

      const fetchUserDetails = async (uid) => {
        return new Promise((resolve, reject) => {
          var getUserDetailsById = `SELECT * FROM users WHERE user_id='${uid}'`;
          db.query(getUserDetailsById, (error, userDetails) => {
            if (error) {
              reject(error);
            } else {
              resolve(userDetails);
            }
          });
        });
      };

      var checkExisting = `SELECT * FROM event_bookings WHERE user_id='${userId}'`;

      db.query(checkExisting, async (error, bookingResults) => {
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
            for (var i = 0; i < bookingResults.length; i++) {
              var evId = bookingResults[i].event_id;
              var uid = bookingResults[i].user_id;
              bookingResults[i].eventDetails = await fetchEventDetails(evId);
              bookingResults[i].userDetails = await fetchUserDetails(uid);
            }
            res.json({
              success: true,
              bookingResults,
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
//get list of user
router.get("/userlist/", (req, res) => {
  try {
    let tokenHeader = process.env.TOKEN_HEADER_KEY;
    let tokenSecrete = process.env.JWT_SECRET_KEY;

    // validate the token
    const token = req.header(tokenHeader);
    const verified = jwt.verify(token, tokenSecrete);
    if (verified) {
      var userList = `SELECT * FROM users`;
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
              message: "No User Found",
            });
          } else {
            res.json({
              success: true,
              results,
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
//get list of guest
router.get("/guestlist/", (req, res) => {
  try {
    let tokenHeader = process.env.TOKEN_HEADER_KEY;
    let tokenSecrete = process.env.JWT_SECRET_KEY;

    // validate the token
    const token = req.header(tokenHeader);
    const verified = jwt.verify(token, tokenSecrete);
    if (verified) {
      var userList = `SELECT * FROM guests`;
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
              message: "No User Found",
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

// get guest by user id
router.get("/guests/:userid", (req, res) => {
  try {
    const userid = req.params.userid;
    // check existing user
    var checkExisting = `SELECT * FROM guests WHERE user_id='${userid}'`;
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
            results,
          });
        } else {
          res.json({
            success: false,
            message: "User Not Found!, try again!",
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
// get guest by user id
router.get("/payments/:userid", (req, res) => {
  try {
    const userid = req.params.userid;
    // check existing user
    var checkExisting = `SELECT * FROM payments WHERE user_id='${userid}'`;
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
            results,
          });
        } else {
          res.json({
            success: false,
            message: "Payment Not Found!, try again!",
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

// Search User
router.get("/search/", (req, res) => {
  try {
    const searchQuery = req.query.text;

    var searchQueryDb = `SELECT * FROM users WHERE user_name LIKE '%${searchQuery}%' OR user_email LIKE '%${searchQuery}%'`;
    db.query(searchQueryDb, (error, results) => {
      if (error) {
        res.json({
          success: false,
          error,
        });
      } else {
        if (results.length != 0) {
          res.status(200).json({
            success: true,
            searchResults: results,
          });
        } else {
          res.status(404).json({
            success: false,
            message: "Search related info not found!",
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


// get all user by id
router.get("/details/:userid", (req, res) => {
  try {
    const userid = req.params.userid;
    // check existing user
    var checkExisting = `SELECT * FROM users WHERE user_id='${userid}' AND isDeleted='0'`;
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
            results,
          });
        } else {
          res.json({
            success: false,
            message: "User Not Found!, try again!",
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

router.post("/create2/", (req, res) => {
  try {
    const packageId = req.body.package_id;
    const packageName = req.body.package_name;
    const packageDesc = req.body.package_desc;
    const amount = req.body.amount;
    const validity = req.body.validity;

    var sqlquery = `INSERT INTO packages(package_id,package_name,package_desc, amount,validity) VALUES (${packageId}, '${packageName}', '${packageDesc}', '${amount}', '${validity}')`
    db.query(sqlquery, (error, results) => {
      if (error) {
        res.json({
          success: false,
          error,
        });
      } else {
        res.json({
          success: true,
          results,
          message: "User Registered Success.",
        });
      }
    });
  } catch (error) {
    res.json({
      success: false,
      error,
    });
  }
})
module.exports = router;
