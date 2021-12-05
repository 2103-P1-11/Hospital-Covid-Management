//app/routes/blog.js
const express = require("express")
const router = express.Router()
const bed = require("../../controllers/bedController");

//Create a bed
router.post("/createnew", bed.createNew);

//Retrieve all beds
router.get("/retrieveall", bed.findAllBed);

//Retrieve bedinfo with bedid
router.post("/retrieveexact", bed.findOneBed);

//Update bedinfo with bedid
router.post("/updatebed", bed.updateBed);

//Delete existing bed with bedid
router.post("/deletebed", bed.deleteBed);

module.exports = router;