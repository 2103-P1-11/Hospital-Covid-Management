const express = require("express")
const router = express.Router()
const dash = require("../../controllers/complexController");

//router.get("/hospitaldays", dash.findAll);

//router.get("/hospitaltotal", dash.getAverageHospitalStay)

router.get("/admission", dash.getTotalAdmittedPatient);

router.get("/totaladmission", dash.getCountAdmittedPatients);

// router.get("/admitweek",dash.getRecentAdmit);

//Gets empty bed by ward
router.get("/ward", dash.getEmptyBed); 

// router.get("/mostrecent", dash.getMostRecentAdmission);

router.get("/hospitalinfo", dash.getHospitalInfo);

// router.get("/all discharge", dash.getAllDischarge);

// For patient
router.get("/getparticulars", dash.getParticulars);

router.get("/transfer", dash.getTransfer);

router.get("/getsevere", dash.getSevere);

module.exports = router;
