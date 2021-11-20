const express = require("express")
const router = express.Router()
const db = require('../config/dbconfig')

router.get('/all', (req, res) => {
    db.any("Select * from patient;").then(rows=>{
        // console.log(rows);
        res.json(rows)
    }).catch(error=>{
        console.log(error)
    })
})

router.get('/getavgdays', (req, res) => {
    db.any("Select patient.patientid, DATE_PART('day', patient.dischargedate - admissiondate) from patient where dischargedate > CURRENT_DATE;").then(rows=>{
        res.json(rows)
    }).catch(error=>{
        console.log(error)
    })
})



module.exports = router;