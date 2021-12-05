const express = require("express")
const router = express.Router()
const swab = require("../../controllers/swabController.js");

//Create a swab
router.post("/createnew", swab.createNew);

//Retrieve all swab
router.get("/retrieveall", swab.findAllSwabs);

//Retrieve swabinfo with swabid
router.post("/retrieveexact", swab.findOneSwab);

//Update swabinfo with swabid
router.post("/updateswab", swab.updateSwab);

//Delete existing swab with swabid
router.post("/deleteswab", swab.deleteSwab);

module.exports = router;