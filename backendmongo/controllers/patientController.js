const db = require("../models");
const Patient = db.patient;

// Create and Save a new patient
exports.createNew = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a patient
    const patient = new Patient({
        patientid: req.body.patientid,
        patientname: req.body.patientname,
        admissiondate: req.body.admissiondate,
        dischargedate: req.body.dischargedate,
        statusno: req.body.statusno
    });

    // Save patient in the database
    patient
        .save(patient)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the patient."
            });
        });

};

// Retrieve all patients from the database.
exports.findAllPatients = (req, res) => {

    Patient.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving patients."
            });
        });


};

// Find a single patient with an id
exports.findOnePatient = (req, res) => {

    Patient.find(req.body.params)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Not found patient with id " + req.body.params});
            }
            else {
                res.send(data);
            }
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving patient with id=" + req.body.params });
        });

};

// Update a patient by the id in the request
exports.updatePatient = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const find = req.body.params;
    const setValue = req.body.data;

    Patient.findOneAndUpdate(find, setValue, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Patient with id=${find}. Maybe Patient was not found!`
                });
            } else res.send({message: "Patient Information Successfully Updated!"});
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Patient with id=" + find
            });
        });

};


// Delete a Patient with the specified patientid in the request
exports.deletePatient = (req, res) => {
    const query = req.body.params;

    Patient.findOneAndRemove(query)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Patient with id=${query}. Maybe Patient was not found!`
                });
            } else {
                res.send({
                    message: "Patient was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Patient with id=" + query
            });
        });

};

