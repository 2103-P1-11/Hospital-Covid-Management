const express = require("express")
const router = express.Router()
const staff = require("../../controllers/staffController.js");

//Create a staff
router.post("/createnew", staff.createNew);

//Retrieve all staff
router.get("/retrieveall", staff.findAllStaffs);

//Retrieve staffinfo with staffid
router.post("/retrieveexact", staff.findOneStaff);

//Update staffinfo with staffid
router.post("/updatestaff", staff.updateStaff);

//Delete existing staff with staffid
router.post("/deletestaff", staff.deleteStaff);

module.exports = router;