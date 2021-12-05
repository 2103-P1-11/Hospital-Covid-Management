const { mongo } = require("mongoose");
const db = require("../models");
const Bed = db.bed;

// Create and Save a new bed
exports.createNew = (req, res) => {
  // Validate request
if (!req.body) {
  res.status(400).send({ message: "Content can not be empty!" });
  return;
}

// Create a bed
const bed = new Bed({
  bedid: req.body.bedid,
  wardid: req.body.wardid,
  patientid: req.body.patientid,
  bedstatus: req.body.bedstatus
});

// Save bed in the database
bed
  .save(bed)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the bed."
    });
  });

};

// Retrieve all beds from the database.
exports.findAllBed = (req, res) => {

  Bed.find()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving beds."
      });
    });


};

// Find a single bed with an id
exports.findOneBed = (req, res) => {
  console.log(req.body.params)

    Bed.find(req.body.params)
      .then(data => {
        if (!data){
          res.status(404).send({ message: "Not found bed with id " + req.body.params });
        }
        else
        { res.send(data);
        }
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving bed with id=" + req.body.params });
      });

};

// Update a bed by the id in the request
exports.updateBed = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }

      const find = req.body.params;
      const setValue = req.body.data;

      Bed.findOneAndUpdate(find, setValue, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update Bed with id=${find}. Maybe Bed was not found!`
            });
          } else res.send({message: "Bed Information Successfully Updated!"});
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating Bed with id=" + find
          });
        });

};


// Delete a bed with the specified bedid in the request
exports.deleteBed = (req, res) => {
    const query = req.body.params;

    Bed.findOneAndRemove(query)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Bed with id=${query}. Maybe Bed was not found!`
          });
        } else {
          res.send({
            message: "Bed was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Bed with id=" + query
        });
      });

};
