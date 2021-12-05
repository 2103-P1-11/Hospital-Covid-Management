
module.exports = mongoose => {
    const staff = mongoose.model(
      "staff",
      mongoose.Schema(
        {
            staffid: Number,
            staffphone: Number,
            staffname: String,
            staffposition: String
        },
        { timestamps: true, 
        collection: 'staff'}
      )
    );
  
    return staff;
  };