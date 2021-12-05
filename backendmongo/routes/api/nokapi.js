const express = require("express")
const router = express.Router()
const nok = require("../../controllers/nokController.js");

//Create a nok
router.post("/createnew", nok.createNew);

//Retrieve all nok
router.get("/retrieveall", nok.findAllNoks);

//Retrieve nokinfo with nokid
router.post("/retrieveexact", nok.findOneNok);

//Update nokinfo with nokid
router.post("/updatenok", nok.updateNok);

//Delete existing nok with nokid
router.post("/deletenok", nok.deleteNok);

module.exports = router;