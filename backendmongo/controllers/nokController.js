const db = require("../models");
const Nok = db.nok;

// Create and Save a new nok
exports.createNew = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a nok
    const nok = new Nok({
            nokid: req.body.nokid,
            nokname: req.body.nokname,
            nokcontact: req.body.nokcontact,
            nokemail: req.body.nokemail,
            patientid: req.body.patientid
    });

    // Save nok in the database
    nok
        .save(nok)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the nok."
            });
        });

};

// Retrieve all nok from the database.
exports.findAllNoks = (req, res) => {

    Nok.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving noks."
            });
        });


};

// Find a single nok with an id
exports.findOneNok = (req, res) => {

    Nok.find(req.body.params)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Not found nok with id " + req.body.params});
            }
            else {
                res.send(data);
            }
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving nok with id=" + req.body.params });
        });

};

// Update a nok by the id in the request
exports.updateNok = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const find = req.body.params;
    const setValue = req.body.data;

    Nok.findOneAndUpdate(find, setValue, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Nok with id=${find}. Maybe Nok was not found!`
                });
            } else res.send({message: "Nok Information Successfully Updated!"});
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Nok with id=" + find
            });
        });

};


// Delete a nok with the specified nokid in the request
exports.deleteNok = (req, res) => {
    const query = req.body.params;

    Nok.findOneAndRemove(query)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Nok with id=${query}. Maybe Nok was not found!`
                });
            } else {
                res.send({
                    message: "Nok was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Nok with id=" + query
            });
        });

};

