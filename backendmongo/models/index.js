const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
//db table
db.bed = require("./bed.js")(mongoose);
db.hospital = require("./hospital.js")(mongoose);
db.nok = require("./nok.js")(mongoose);
db.patient = require("./patient.js")(mongoose);
db.staff = require("./staff.js")(mongoose);
db.status = require("./status.js")(mongoose);
db.swab = require("./swab.js")(mongoose);
db.ward = require("./ward.js")(mongoose);

module.exports = db;