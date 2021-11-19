const express = require("express")
const router = express.Router()
const db = require('../config/dbconfig')

// Display all the beds <empty & not empty>
router.get('/getallbeds', (req, res) => {
    db.any("Select * from bed;").then(rows=>{
        // console.log(rows);
        res.json(rows)
    }).catch(error=>{
        console.log(error)
    })
})

//Display all empty beds in hospital
router.get('/gethospbeds', (req, res) => {
    db.any("SELECT ward.hospitalid, ward.wardid, bed.bedid, bed.bedstatus FROM bed INNER JOIN ward ON bed.wardid=ward.wardid INNER JOIN hospital ON ward.hospitalid=hospital.hospitalid;").then(rows=>{
        res.json(rows)
    }).catch(error=>{
        console.log(error)
    })
})

//Display all empty beds in wards of each hospital
router.get('/getwardbeds', (req, res) => {
    db.any("SELECT ward.wardid, bed.bedid, bed.bedstatus FROM bed INNER JOIN ward ON bed.wardid=ward.wardid where bed.bedstatus=0").then(rows=>{
        res.json(rows)
    }).catch(error=>{
        console.log(error)
    })
})

//Display all empty beds in wards of each hospital
router.post('/postwardinfo', (req, res) => {
    const {wardid} = req.body;
    db.any("SELECT * FROM ward where wardid="+wardid+";").then(rows=>{
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



router.post('/updatestatus', async (req, res) => {
    try {
        // parse request body
        const {patient, status} = req.body;

        console.log(patient, status)

        //Do SQL query
        const getData = await db.query("Select bedid from bed where patientid = "+patient+";")
        res.json(getData)
        
    } catch (e) {
        console.error(e.message)
    }
})

router.post('/check', async (req, res) => {
    try {
        // parse request body
        const {patient, status} = req.body;

        console.log(patient, status)

        //Do SQL query
        const getData = await db.query("Select bedid from bed where patientid = 10103;")
        res.json(getData)
        
    } catch (e) {
        console.error(e.message)
    }
})

module.exports = router;