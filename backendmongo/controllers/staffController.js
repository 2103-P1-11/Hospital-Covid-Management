const db = require("../models");
const Staff = db.staff;

// Create and Save a new staff
exports.createNew = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a staff
    const staff = new Staff({
            staffid: req.body.staffid,
            staffphone: req.body.staffphone,
            staffname: req.body.staffname,
            staffposition: req.body.staffposition
    });

    // Save staff in the database
    staff
        .save(staff)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the staff."
            });
        });

};

// Retrieve all staff from the database.
exports.findAllStaffs = (req, res) => {

    Staff.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving staffs."
            });
        });


};

// Find a single staff with an id
exports.findOneStaff = (req, res) => {

    Staff.find(req.body.params)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Not found staff with id " + req.body.params});
            }
            else {
                res.send(data);
            }
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving staff with id=" + req.body.params });
        });

};

// Update a staff by the id in the request
exports.updateStaff = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const find = req.body.params;
    const setValue = req.body.data;

    Staff.findOneAndUpdate(find, setValue, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Staff with id=${find}. Maybe Staff was not found!`
                });
            } else res.send({message: "Staff Information Successfully Updated!"});
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Staff with id=" + find
            });
        });

};


// Delete a staff with the specified staffid in the request
exports.deleteStaff = (req, res) => {
    const query = req.body.params;

    Staff.findOneAndRemove(query)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Staff with id=${query}. Maybe Staff was not found!`
                });
            } else {
                res.send({
                    message: "Staff was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Staff with id=" + query
            });
        });

};

