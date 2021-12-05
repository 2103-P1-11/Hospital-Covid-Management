const db = require("../models");
const Status = db.status;

// Create and Save a new status
exports.createNew = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a status
    const status = new Status({
            statusno: req.body.statusno,
            condition: req.body.condition
    });

    // Save status in the database
    status
        .save(status)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the status."
            });
        });

};

// Retrieve all status from the database.
exports.findAllStatus = (req, res) => {

    Status.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving status."
            });
        });


};


// Delete a status with the specified statusid in the request
exports.deleteStatus = (req, res) => {
    const query = req.body.params;

    Status.findOneAndRemove(query)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Status with id=${query}. Maybe Status was not found!`
                });
            } else {
                res.send({
                    message: "Status was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Status with id=" + query
            });
        });

};

