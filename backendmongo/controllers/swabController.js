const db = require("../models");
const Swab = db.swab;

// Create and Save a new swab
exports.createNew = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a swab
    const swab = new Swab({
            swabid: req.body.swabid,
            swabresult: req.body.swabresult,
            administertime: req.body.administertime,
            patientid: req.body.patientid,
            staffid: req.body.staffid
    });

    // Save swab in the database
    swab
        .save(swab)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the swab."
            });
        });

};

// Retrieve all swab from the database.
exports.findAllSwabs = (req, res) => {

    Swab.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving swabs."
            });
        });


};

// Find a single swab with an id
exports.findOneSwab = (req, res) => {

    Swab.find(req.body.params)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Not found swab with id " + req.body.params});
            }
            else {
                res.send(data);
            }
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving swab with id=" + req.body.params });
        });

};

// Update a swab by the id in the request
exports.updateSwab = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const find = req.body.params;
    const setValue = req.body.data;

    Swab.findOneAndUpdate(find, setValue, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Swab with id=${find}. Maybe Swab was not found!`
                });
            } else res.send({message: "Swab Information Successfully Updated!"});
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Swab with id=" + find
            });
        });

};


// Delete a swab with the specified swabid in the request
exports.deleteSwab = (req, res) => {
    const query = req.body.params;

    Swab.findOneAndRemove(query)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Swab with id=${query}. Maybe Swab was not found!`
                });
            } else {
                res.send({
                    message: "Swab was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Swab with id=" + query
            });
        });

};

