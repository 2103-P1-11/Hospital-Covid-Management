module.exports = mongoose => {
    const status = mongoose.model(
      "status",
      mongoose.Schema(
        {
            statusno: Number,
            condition: String
        },
        { timestamps: true, 
        collection: 'status'}
      )
    );
  
    return status;
  };