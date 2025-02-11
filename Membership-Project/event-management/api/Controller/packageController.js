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

//package list
router.post("/create-package/", (req, res) => {
    try {
        const event_id = req.body.event_id;
        const package_name = req.body.package_name;
        const subscriber_status = req.body.subscriber_status;
        const subscriber_amount = req.body.subscriber_amount;
        const subscriber_validity = req.body.subscriber_validity;

        var sqlList = `INSERT INTO subscriber_package_list(event_id, package_name, subscriber_status,subscriber_amount, subscriber_validity)
        VALUES (${event_id}, '${package_name}','${subscriber_status}', '${subscriber_amount}', '${subscriber_validity}')`;
        db.query(sqlList, (err, results) => {
            if(err){
                res.json({
                    success:false,
                    message:"Data Not found",
                    err,
                });
            }else{
                res.json({
                    success:true,
                    message:"package list created success",
                    results,
                });
            }
        });
    } catch (error) {
        res.json({
            success:false,
            error,
        });
    }
});
//package list data
router.post("/subscribe-package/", (req,res) => {
    try {
        const subscriberStatus = req.body.subscriber_status;
            var subscriberPackage = `SELECT * FROM subscriber_package_list WHERE subscriber_status='${subscriberStatus}'`;
            db.query(subscriberPackage, (err, results) => {
                if(err){
                    res.json({
                        success:false,
                        message:"Data Not found",
                        err,
                    });
                }else{
                    res.json({
                        success:true,
                        message:"Package Data Create Successfully",
                        results,
                    });
                }
            })
    } catch (error) {
        res.json({
            success:false,
            error,
        });
    }
});
module.exports = router;
