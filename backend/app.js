const express = require("express")
const app = express();
const db = require('./config/dbconfig')
const cors = require('cors')

app.use(express.json()).use(cors());

const bedRouter = require('./controllers/bed')
app.use('/bed', bedRouter)

const hosRouter = require('./controllers/hospital')
app.use('/hos', hosRouter)

app.listen(5000,()=>{
    console.log("server is listening on port 5000")
})