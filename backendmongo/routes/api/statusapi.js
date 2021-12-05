const express = require("express")
const router = express.Router()
const status = require("../../controllers/statusController.js");

//Create a status
router.post("/createnew", status.createNew);

//Retrieve all status with statusid
router.get("/retrieveall", status.findAllStatus);

//Delete existing status with statusid
router.post("/deletestatus", status.deleteStatus);

module.exports = router;