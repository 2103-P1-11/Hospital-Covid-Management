const express = require("express")
const router = express.Router()
const patient = require("../../controllers/patientController.js");

//Create a patient
router.post("/createnew", patient.createNew);

//Retrieve all patient
router.get("/retrieveall", patient.findAllPatients);

//Retrieve patientinfo with patientid
router.post("/retrieveexact", patient.findOnePatient);

//Update patientinfo with patientid
router.post("/updatepatient", patient.updatePatient);

//Delete existing patient with patientid
router.post("/deletepatient", patient.deletePatient);

module.exports = router;