const express = require("express")
const router = express.Router()
const ward = require("../../controllers/wardController.js");

//Create a ward
router.post("/createnew", ward.createNew);

//Retrieve all ward with wardid
router.post("/retrieveall", ward.findAllWards);

//Update wardinfo with wardid
router.post("/updateward", ward.updateWard);

//Delete existing ward with wardid
router.post("/deleteward", ward.deleteWard);

module.exports = router;