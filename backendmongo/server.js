const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require('dotenv').config()


// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));

const db = require("./models");

db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

const complex = require('./routes/api/complexapi')
  app.use('/complex', complex)

const bed = require('./routes/api/bedapi')
app.use("/bed", bed)

const patient = require('./routes/api/patientapi')
app.use('/patient', patient)

const hospital = require('./routes/api/hospitalapi')
app.use('/hospital', hospital)

const ward = require('./routes/api/wardapi')
app.use('/ward', ward)

const staff = require('./routes/api/staffapi')
app.use('/staff', staff)

const status = require('./routes/api/statusapi')
app.use('/status', status)

const nok = require('./routes/api/nokapi')
app.use('/nok', nok)

const swab = require('./routes/api/swabapi')
app.use('/swab', swab)

// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// // eslint-disable-next-line no-unused-vars
// app.use(function (err, req, res,next) {
//   console.error(err.message);
//   if (!err.statusCode) err.statusCode = 500;
//   res.status(err.statusCode).send(err.message);
// });