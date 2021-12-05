const db = require("../models");
const Ward = db.ward;

// Create and Save a new ward
exports.createNew = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a ward
    const ward = new Ward({
            wardid: req.body.wardid,
            wardtype: req.body.wardtype,
            hospitalid: req.body.hospitalid,
            staffid1: req.body.staffid1,
            staffid2: req.body.staffid2,
            wardno: req.body.wardno
    });

    // Save ward in the database
    ward
        .save(ward)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the ward."
            });
        });

};

// Retrieve all ward from the database.
exports.findAllWards = (req, res) => {
console.log(req.body.params)
    Ward.find(req.body.params)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving ward."
            });
        });


};

// Update a ward by the id in the request
exports.updateWard = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const find = req.body.params;
    const setValue = req.body.data;

    Ward.findOneAndUpdate(find, setValue, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Ward with id=${find}. Maybe Ward was not found!`
                });
            } else res.send({message: "Ward Information Successfully Updated!"});
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Ward with id=" + find
            });
        });

};


// Delete a Ward with the specified wardid in the request
exports.deleteWard = (req, res) => {
    const query = req.body.params;

    Ward.findOneAndRemove(query)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Ward with id=${query}. Maybe Ward was not found!`
                });
            } else {
                res.send({
                    message: "Ward was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Ward with id=" + query
            });
        });

};

