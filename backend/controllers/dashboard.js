const express = require("express")
const router = express.Router()
const db = require('../config/dbconfig')

router.get('/bedstatus', (req, res) => {
    db.any("Select bed.bedstatus, count(bed.bedstatus) as total from bed group by bed.bedstatus;").then(rows=>{
        res.json(rows)
    }).catch(error=>{
        console.log(error)
    })
})

router.get('/icubedstatus', (req, res) => {
    db.any("Select bed.bedstatus, count(bed.bedstatus) as total from bed left join ward on bed.wardid = ward.wardid where ward.wardtype = 'ICU' group by bed.bedstatus;").then(rows=>{
        res.json(rows)
    }).catch(error=>{
        console.log(error)
    })
})

router.get('/hospital', (req, res) => {
    db.any("SELECT ward.hospitalid, ward.wardid, bed.bedid, bed.bedstatus FROM bed INNER JOIN ward ON bed.wardid=ward.wardid INNER JOIN hospital ON ward.hospitalid=hospital.hospitalid;").then(rows=>{
        res.json(rows)
    }).catch(error=>{
        console.log(error)
    })
})

router.get('/ward', (req, res) => {
    db.any("SELECT ward.wardid, bed.bedid, bed.bedstatus FROM bed INNER JOIN ward ON bed.wardid=ward.wardid where bed.bedstatus=0").then(rows=>{
        res.json(rows)
    }).catch(error=>{
        console.log(error)
    })
})

router.get('/admission', (req, res) => {
    db.any("Select bed.bedid, bed.patientid, bed.bedstatus, patient.admissiondate, patient.statusno from bed left join patient on bed.patientid = patient.patientid;").then(rows=>{
        res.json(rows)
    }).catch(error=>{
        console.log(error)
    })
})

//Display all empty beds in wards of each hospital
router.post('/searchward', (req, res) => {
    const {wardid} = req.body;
    db.any("SELECT * FROM ward where wardid="+wardid+";").then(rows=>{
        res.json(rows)
    }).catch(error=>{
        console.log(error)
    })
})

router.post('/updatestatus', async (req, res) => {
    try {
        // parse request body
        const {bedid, patientid, bedstatus} = req.body;

        // patientid is null if no patient
        //Do SQL query
        const getData = await db.query("update bed set bedstatus = "+bedstatus+", patientid="+patientid+" where bedid = "+bedid+";")
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