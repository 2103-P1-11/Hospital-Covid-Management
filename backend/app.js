const express = require("express")
const app = express();
const db = require('./config/dbconfig')
const cors = require('cors')

app.use(express.json()).use(cors());

const dbRouter = require('./controllers/dashboard')
app.use('/db', dbRouter)

const hosRouter = require('./controllers/hospital')
app.use('/hos', hosRouter)

const staffRouter = require('./controllers/staff')
app.use('/staff', staffRouter)

const patientRouter = require('./controllers/patient')
app.use('/patient', patientRouter)

app.listen(5000,()=>{
    console.log("server is listening on port 5000")
})