
module.exports = mongoose => {
    const nok = mongoose.model(
      "nok",
      mongoose.Schema(
        {
            nokid: Number,
            nokname: String,
            nokcontact: Number,
            nokemail: String,
            patientid: Number
        },
        { timestamps: true, 
        collection: 'nok'}
      )
    );
  
    return nok;
  };