
module.exports = mongoose => {
    const patient = mongoose.model(
      "patient",
      mongoose.Schema(
        {
            patientid: Number,
            patientname: String,
            admissiondate: Date,
            dischargedate: Date,
            statusno: Number
        },
        { timestamps: true, 
        collection: 'patient'}
      )
    );
  
    return patient;
  };