const express = require("express")
const router = express.Router()
const db = require('../config/dbconfig')

router.get('/all', (req, res) => {
    db.any("Select patientid, patientname, date(admissiondate) as admissiondate, date(dischargedate) as dischargedate, statusno from patient;").then(rows=>{
        res.json(rows)
    }).catch(error=>{
        console.log(error)
    })
})

router.get('/getparticulars', (req, res) => {
    db.any("Select hospital.hospitalid, hospital.hospitalname, ward.wardtype, ward.wardid,\
    ward.staffid1, ward.staffid2, bed.bedid, patient.patientid, patient.patientname,\
    patient.admissiondate, patient.dischargedate, patient.statusno,\
    nok.nokid, nok.nokname, nok.nokcontact, nok.nokemail from hospital left join ward on hospital.hospitalid = ward.hospitalid left join bed on ward.wardid = bed.wardid left join patient\
    on bed.patientid = patient.patientid left join nok on patient.patientid = nok.patientid\
    where bed.bedstatus = 1 order by hospital.hospitalid;").then(rows=>{
        res.json(rows)
    }).catch(error=>{
        console.log(error)
    })
})



router.get('/bedsavailable', (req, res) => {
    db.any("Select hospital.hospitalid, ward.wardtype, count(bedstatus) as availablebed from bed left join ward \
    on bed.wardid = ward.wardid left join hospital on hospital.hospitalid = ward.hospitalid\
    where bedstatus = 0 group by hospital.hospitalid, ward.wardtype order by hospital.hospitalid asc").then(rows=>{
        // console.log(rows);
        res.json(rows)
    }).catch(error=>{
        console.log(error)
    })
})

router.get('/getnonsevere', (req, res) => {
    db.any("Select hospital.hospitalid, patient.statusno, count(patient.statusno) from hospital left join ward on \
    hospital.hospitalid = ward.hospitalid left join bed \
    on ward.wardid = bed.wardid left join patient on\
    bed.patientid = patient.patientid where patient.statusno < 4 \
    group by hospital.hospitalid, patient.statusno order by hospital.hospitalid, patient.statusno").then(rows=>{
        res.json(rows)
    }).catch(error=>{
        console.log(error)
    })
})

router.get('/getsevere', (req, res) => {
    db.any("Select hospital.hospitalid, patient.statusno, count(patient.statusno) from hospital left join ward on \
    hospital.hospitalid = ward.hospitalid left join bed \
    on ward.wardid = bed.wardid left join patient on\
    bed.patientid = patient.patientid where patient.statusno > 3 AND patient.statusno < 6\
    group by hospital.hospitalid, patient.statusno order by hospital.hospitalid, patient.statusno").then(rows=>{
        res.json(rows)
    }).catch(error=>{
        console.log(error)
    })
})

router.get('/transfer', (req, res) => {
    db.any("Select hospital.hospitalid, ward.wardid, bed.bedid, bed.bedstatus, bed.patientid, patient.statusno\
    from hospital \
    left join ward on hospital.hospitalid = ward.hospitalid left join\
    bed on ward.wardid = bed.wardid left join patient on patient.patientid = bed.patientid\
    where ward.wardtype = 'ICU'\
    order by hospital.hospitalid, ward.wardtype;").then(rows=>{
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

router.get('/statusall', async (req, res) => {
    try {
        //Do SQL query
        const getData = await db.query("Select * from status;")
        return res.json(getData)
        
    } catch (e) {
        console.error(e.message)
    }
})

router.get('/nokall', async (req, res) => {
    try {
        //Do SQL query
        const getData = await db.query("Select * from NOK;")
        return res.json(getData)
        
    } catch (e) {
        console.error(e.message)
    }
})

// router.post('/newpatient', async (req, res) => {
//     try {
//         // parse request body
//         const {patientname, admissiondate, dischargedate, statusno} = req.body;

//         //Do SQL query
//         const getData = await db.query("insert into patient (patientname, admissiondate, dischargedate, statusno) values ('"+patientname+"','"+patientname+"','"+patientname+"','"+patientname+"');")
//         res.json(getData)
        
//     } catch (e) {
//         console.error(e.message)
//     }
// })



module.exports = router;