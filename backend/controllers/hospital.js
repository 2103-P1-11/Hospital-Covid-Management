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


module.exports = router;