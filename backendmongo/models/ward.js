module.exports = mongoose => {
    const ward = mongoose.model(
      "ward",
      mongoose.Schema(
        {
            wardid: Number,
            wardtype: String,
            hospitalid: Number,
            staffid1: Number,
            staffid2: Number,
            wardno: Number
        },
        { timestamps: true, 
        collection: 'ward'}
      )
    );
  
    return ward;
  };