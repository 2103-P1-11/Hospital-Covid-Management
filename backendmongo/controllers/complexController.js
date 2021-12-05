const db = require("../models");
const Bed = db.bed;
const Hospital = db.hospital;
const Nok = db.nok;
const Patient = db.patient;
const Staff = db.staff;
const Status = db.status;
const Swab = db.swab;
const Ward = db.ward;

// exports.getBedStatus = (req, res) => {};

// exports.getICUBedStatus = (req, res) => {};

// exports.getAllDischarge= (req, res) => {};

// exports.getRecentAdmit= (req, res) => {};

exports.getHospitalInfo= (req, res) => {
    Hospital.find()
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

// exports.getMostRecentAdmission= (req, res) => {};

// exports.getWard= (req, res) => {};

exports.getTotalAdmittedPatient= (req, res) => {
  Ward.aggregate([{
    $lookup:
    {
      from: 'bed',
      localField: 'wardid',
      foreignField: 'wardid',
      as: 'wardBeds'
    }
  },{//open up the array
      $unwind: {
        path:'$wardBeds'
    }
    },{
      $lookup:
      {
        from: 'patient',
        localField: 'wardBeds.patientid',
        foreignField: 'patientid',
        as: 'wardBeds.admittedPatients'
      }
    },{//open up the array
      $unwind: {
        path:'$wardBeds.admittedPatients',
        preserveNullAndEmptyArrays: true
      }
    },{
      $project:{
        "wardBeds.bedid":1,
        "wardBeds,patientid":1,
        "wardBeds.bedstatus":1,
        "wardBeds.admittedPatients.admissiondate":1,
        "wardBeds.admittedPatients.statusno":1
      }
    }
  ])
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

exports.getCountAdmittedPatients= (req, res) => {
  Ward.aggregate([{
    $lookup:
    {
      from: 'bed',
      localField: 'wardid',
      foreignField: 'wardid',
      as: 'wardBeds'
    }
  },{//open up the array
      $unwind: {
        path:'$wardBeds'
    }
    },{
      $lookup:
      {
        from: 'patient',
        localField: 'wardBeds.patientid',
        foreignField: 'patientid',
        as: 'wardBeds.admittedPatients'
      }
    },{//open up the array
      $unwind: {
        path:'$wardBeds.admittedPatients',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $match:{
        "wardBeds.bedstatus":1
      }
    },{
      $count: "Total Number of Admitted Patients"
      }
    
  ])
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


// exports.getAverageHospitalStay= (req, res) => {};

// exports.getAverageDays= (req, res) => {};

// exports.getAdmittedWeek= (req, res) => {};

// // for /ward but getting clarification
 exports.getEmptyBed= (req, res) => {
  Ward.aggregate([{
    $lookup:
    {
      from: 'bed',
      localField: 'wardid',
      foreignField: 'wardid',
      as: 'wardBeds'
    }
  },{//open up the array
      $unwind: {
        path:'$wardBeds',
        preserveNullAndEmptyArrays: true
    }
    },{
      $match: 
      {
        "wardBeds.bedstatus": 0
      }
    }
  ])
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving beds."
    });
  });
 }


exports.getAvailableBed = (req, res) =>{
  const query = req.body.params;
  Hospital.aggregate([{
    $lookup:
    {
      from: 'ward', //targeted collection
      localField: 'hospitalid', //field name
      foreignField: 'hospitalid', //targeted field name
      as: 'fromWard' 
    }
  },{//open up the array
    $unwind: {
      path:'$fromWard',
      preserveNullAndEmptyArrays: true
  }
  },{
    $lookup:
    {
      from: 'bed', //targeted collection
      localField: 'fromWard.wardid', //field name
      foreignField: 'wardid', //targeted field name
      as: 'fromWard.beds' 
    }
  },{//open up the array
    $unwind: {
      path:'$fromWard.beds',
      preserveNullAndEmptyArrays: true
    }
  },{
    $match: 
    {
      "hospitalname": query,
      "fromWard.beds.bedstatus": 0
    }
  },
{
    $project: {
      "hospitalname":1,
      "hospitalid" :1,
      "fromWard.wardid":1,
      "fromWard.beds.bedstatus":1
    } 

  }])
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving beds."
      });
    });
}

exports.getOccupiedBed = (req, res) =>{

  Hospital.aggregate([{
    $lookup:
    {
      from: 'ward', //targeted collection
      localField: 'hospitalid', //field name
      foreignField: 'hospitalid', //targeted field name
      as: 'fromWard' 
    }
  },{//open up the array
    $unwind: {
      path:'$fromWard',
      preserveNullAndEmptyArrays: true
  }
  },{
    $lookup:
    {
      from: 'bed', //targeted collection
      localField: 'fromWard.wardid', //field name
      foreignField: 'wardid', //targeted field name
      as: 'fromWard.beds' 
    }
  },{//open up the array
    $unwind: {
      path:'$fromWard.beds',
      preserveNullAndEmptyArrays: true
    }
  },{
    $match: 
    {
      //"hospitalname": query,
      "fromWard.beds.bedstatus": 1
    }
  },
{
    $project: {
      "hospitalname":1,
      "hospitalid" :1,
      "fromWard.wardid":1,
      "fromWard.beds.bedstatus":1
    } 

  }])
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving beds."
      });
    });
}



exports.getParticulars = (req, res) =>{

  Hospital.aggregate([
    {
        '$lookup': {
            'from': 'ward', 
            'localField': 'hospitalid', 
            'foreignField': 'hospitalid', 
            'as': 'currentward'
        }
    }, {
        '$lookup': {
            'from': 'bed', 
            'localField': 'currentward.wardid', 
            'foreignField': 'wardid', 
            'as': 'currentbed'
        }
    }, {
        '$lookup': {
            'from': 'patient', 
            'localField': 'currentbed.patientid', 
            'foreignField': 'patientid', 
            'as': 'currentpatient'
        }
    }, {
        '$lookup': {
            'from': 'nok', 
            'localField': 'currentpatient.patientid', 
            'foreignField': 'patientid', 
            'as': 'currentnok'
        }
    }, {
        '$project': {
            '_id': 0, 
            'address': 0, 
            'postalcode': 0, 
            'currentward': {
                '_id': 0, 
                'hospitalid': 0,
                'wardno': 0
            }, 
            'currentbed': {
                '_id': 0, 
                'wardid': 0, 
                'patientid': 0, 
                'bedstatus': 0
            }, 
            'currentpatient': {
                '_id': 0
            }, 
            'currentnok': {
                '_id': 0, 
                'patientid': 0
            }
        }
    }
])
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving beds."
      });
    });
}

exports.getTransfer = (req, res) =>{

  Hospital.aggregate([
    {
        '$lookup': {
            'from': 'ward', 
            'localField': 'hospitalid', 
            'foreignField': 'hospitalid', 
            'as': 'currentward'
        }
    }, {
        '$lookup': {
            'from': 'bed', 
            'localField': 'currentward.wardid', 
            'foreignField': 'wardid', 
            'as': 'currentbed'
        }
    }, {
        '$lookup': {
            'from': 'patient', 
            'localField': 'currentbed.patientid', 
            'foreignField': 'patientid', 
            'as': 'currentpatient'
        }
    }, {
        '$project': {
            '_id': 0, 
            'hospitalname': 0, 
            'address': 0, 
            'postalcode': 0, 
            'currentward': {
                '_id': 0, 
                'hospitalid': 0, 
                'wardtype': 0, 
                'staffid1': 0, 
                'staffid2': 0, 
                'wardno': 0
            }, 
            'currentbed': {
                '_id': 0, 
                'wardid': 0
            }, 
            'currentpatient': {
                '_id': 0, 
                'patientid': 0, 
                'patientname': 0, 
                'admissiondate': 0, 
                'dischargedate': 0
            }
        }
    }, {
        '$sort': {
            'hospitalid': 1
        }
    }
])
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving beds."
      });
    });
}

exports.getSevere = (req, res) =>{

  Hospital.aggregate([
    {
        '$match': {
            'statusno': {
                '$lt': 5, 
                '$gt': 1
            }
        }
    }, {
        '$project': {
            '_id': 0
        }
    }
])
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving beds."
      });
    });
}


