const express = require("express")
const router = express.Router()
const db = require('../config/dbconfig')

router.get('/all', async (req, res) => {
    try {
        //Do SQL query
        const getData = await db.query("Select * from hospital;")
        return res.json(getData)
        
    } catch (e) {
        console.error(e.message)
    }
})

//Ward breakdown
router.get('/wardbreakdown', async (req, res) => {
    try {
        //Do SQL query
        const getData = await db.query("Select ward.hospitalid, count(ward.wardid) \
        from hospital inner join ward on hospital.hospitalid = ward.hospitalid \
        group by ward.hospitalid;")
        return res.json(getData)
        
    } catch (e) {
        console.error(e.message)
    }
})

router.get('/allwards', async (req, res) => {
    try {
        //Do SQL query
        const getData = await db.query("Select * from ward;")
        return res.json(getData)
        
    } catch (e) {
        console.error(e.message)
    }
})

router.get('/allbeds', async (req, res) => {
    try {
        //Do SQL query
        const getData = await db.query("Select * from bed;")
        return res.json(getData)
        
    } catch (e) {
        console.error(e.message)
    }
})

module.exports = router;