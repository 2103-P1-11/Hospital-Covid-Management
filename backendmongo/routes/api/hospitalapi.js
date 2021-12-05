const express = require("express")
const router = express.Router()
const hospital = require("../../controllers/hospitalController.js");

//Create a hospital
router.post("/createnew", hospital.createNew);

//Retrieve all hospital
router.get("/retrieveall", hospital.findAllHospitals);

//Retrieve hospitalinfo with hospitalid
router.post("/retrieveexact", hospital.findOneHospital);

//Update hospitalinfo with hospitalid
router.post("/updatehospital", hospital.updateHospital);

//Delete existing hospital with hospitalid
router.post("/deletehospital", hospital.deleteHospital);

module.exports = router;