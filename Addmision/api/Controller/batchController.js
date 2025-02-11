const { query } = require("express");
const express = require("express");
const db = require("../Db/config/dbConfig");
const router = express.Router();




// Batch_Created
router.post("/create",(req,res) => {
    try {
        const batch_name = req.body.batch_name
        const start_date = req.body.start_date
        const end_date = req.body.end_date

        var batchCheck = `SELECT * FROM batch WHERE batch_name = '${batch_name}'`
        db.query(batchCheck,(err,result)=>{
            if (err) {
                res.json({
                    success: false,
                    message:"Data Not Found"
                })
            } else {
                if(result.length==0){
                    var batchInsert = `INSERT INTO batch (batch_name,start_date,end_date)
                    VALUES ('${batch_name}','${start_date}','${end_date}')`
                    db.query(batchInsert,(err,result)=>{
                        if(err){[
                            res.json({
                                success:false,
                                message:"Data Not Found",
                                err
                            })
                        ]}else{
                            res.json({
                                success: false,
                                message: "Batch Created Successfully",
                                result
                            })
                        }
                    })
                }else{
                    res.json({
                        success:false,
                        message:"Batch Already Exist"
                    })
                }
            }
        })

       


    } catch (error) {
        res.json({
            success:false,
            message:"Something Went Wrong"
        })
    }
});



// Batch_List
router.get("/batch-list", (req,res)=>{
    try {
        var allBatch = `SELECT * FROM batch` 
        db.query(allBatch, (err,result)=>{
            if(err){
                res.json({
                    success: false,
                    message: "Batch Not Found",
                    err
                })
            }else{
                res.json({
                    success: true,
                    message:"Batch List Found",
                    result
                })
            }
        })
    } catch (error) {
        res.json({
            success: false,
            message:"Something Went Wrong"
        })
    }
})


// Single_Batch
router.post("/single-batch", (req,res)=>{
    try {
        const batch_name = req.body.batch_name
        var singleBatch = `SELECT * FROM batch WHERE batch_name = '${batch_name}'`
        db.query(singleBatch, (err,results)=>{
            if(err){
                res.json({
                    success: false,
                    message: 'Data Not Found',
                    err
                })
            }else{
                if (results.length==0) {
                    res.json({
                        success:false,
                        message:'Data Not Found',
                        results
                    })
                } else {
                    res.json({
                        success: true,
                        message: 'Single Batch Founded',
                        results
                    })  
                }

            }
        })
    } catch (error) {
        res.json({
            success: false,
            message:'Something Went Wrong'
        })
    }
})

module.exports = router;
