module.exports = mongoose => {
    const swab = mongoose.model(
      "swab",
      mongoose.Schema(
        {
            swabid: Number,
            swabresult: String,
            administertime: Date,
            patientid: Number,
            staffid: Number
        },
        { timestamps: true, 
        collection: 'swab'}
      )
    );
  
    return swab;
  };