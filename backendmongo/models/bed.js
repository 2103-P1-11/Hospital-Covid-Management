// module.exports = mongoose => {
    
//   var bedschema = mongoose.Schema(
//     {
//       bedid: Number.isInteger(),
//       wardid: Number.isInteger(),
//       patientid: Number.isInteger()
//     },
//     { timestamps: true }
//   );

//   bedschema.method("toJSON", function() {
//     // eslint-disable-next-line no-unused-vars
//     const { __v, _id, ...object } = this.toObject();
//     object.id = _id;
//     return object;
//   });

//   const bed = mongoose.model("bed", bedschema);
//   return bed;
// };

module.exports = mongoose => {
  const bed = mongoose.model(
    "bed",
    mongoose.Schema(
      {
        bedid: Number,
      wardid: Number,
      patientid: Number,
      bedstatus: Number
      },
      { timestamps: true, 
      collection: 'bed'}
    )
  );

  return bed;
};