const express = require("express")
const router = express.Router()
const dash = require("../../controllers/complexController");

router.get("/admission", dash.getTotalAdmittedPatient);

router.get("/totaladmission", dash.getCountAdmittedPatients);

//Gets empty bed by ward
router.get("/ward", dash.getEmptyBed); 

router.get("/hospitalinfo", dash.getHospitalInfo);

router.post("/getavailable", dash.getAvailableBed);

// For patient
router.get("/getparticulars", dash.getParticulars);

router.get("/transfer", dash.getTransfer);

router.get("/getsevere", dash.getSevere);

module.exports = router;
