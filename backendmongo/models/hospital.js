
module.exports = mongoose => {
    const hospital = mongoose.model(
      "hospital",
      mongoose.Schema(
        {
            hospitalid: Number,
            hospitalname: String,
            address: String,
            postalcode: Number
        },
        { timestamps: true, 
        collection: 'hospital'}
      )
    );
  
    return hospital;
  };