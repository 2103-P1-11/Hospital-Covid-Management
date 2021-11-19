const express = require("express")
const router = express.Router()
const db = require('../config/dbconfig')

// Display all the beds <empty & not empty>
router.get('/getallpatients', (req, res) => {
    db.any("Select * from patient;").then(rows=>{
        // console.log(rows);
        res.json(rows)
    }).catch(error=>{
        console.log(error)
    })
})