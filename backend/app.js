const express = require("express")
const app = express();
const db = require('./config/dbconfig')
const cors = require('cors')

app.use(express.json()).use(cors());

const bedRouter = require('./controllers/bed')
app.use('/bed', bedRouter)

const hosRouter = require('./controllers/hospital')
app.use('/hos', hosRouter)

const staffRouter = require('./controllers/staff')
app.use('/staff', staffRouter)

const patientRouter = require('./controllers/patient')
app.use('/patient', patientRouter)

const misRouter = require('./controllers/misc')
app.use('/db', misRouter)

app.listen(5000,()=>{
    console.log("server is listening on port 5000")
})