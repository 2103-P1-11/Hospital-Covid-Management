const express = require("express")
const router = express.Router()
const db = require('../config/dbconfig')

router.get('/getallhospital', async (req, res) => {
    try {
        // await for data to finish retrieving
        // const {chance} = req['body'];
        // const {}

        // console.log(req['body']['chance'])
        //Do SQL query
        const getData = await db.query("Select * from hospital;")
        return res.json(getData)
        
    } catch (e) {
        console.error(e.message)
    }
})