const db = require("../models");
const Hospital = db.hospital;

// Create and Save a new hospital
exports.createNew = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a hospital
    const hospital = new Hospital({
        hospitalid: req.body.hospitalid,
            hospitalname: req.body.hospitalname,
            address: req.body.address,
            postalcode: req.body.postalcode
    });

    // Save hospital in the database
    hospital
        .save(hospital)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the hospital."
            });
        });

};

// Retrieve all hospital from the database.
exports.findAllHospitals = (req, res) => {

    Hospital.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving hospitals."
            });
        });


};

// Find a single hospital with an id
exports.findOneHospital = (req, res) => {

    Hospital.find(req.body.params)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Not found hospital with id " + req.body.params});
            }
            else {
                res.send(data);
            }
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving hospital with id=" + req.body.params });
        });

};

// Update a hospital by the id in the request
exports.updateHospital = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const find = req.body.params;
    const setValue = req.body.data;

    Hospital.findOneAndUpdate(find, setValue, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Hospital with id=${find}. Maybe Hospital was not found!`
                });
            } else res.send({message: "Hospital Information Successfully Updated!"});
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Hospital with id=" + find
            });
        });

};


// Delete a hospital with the specified hospitalid in the request
exports.deleteHospital = (req, res) => {
    const query = req.body.params;

    Hospital.findOneAndRemove(query)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Hospital with id=${query}. Maybe Hospital was not found!`
                });
            } else {
                res.send({
                    message: "Hospital was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Hospital with id=" + query
            });
        });

};

