const express = require("express")
const app = express();
const db = require('./config/dbconfig')

app.use(express.json());

const bedRouter = require('./controllers/bed')
app.use('/bed', bedRouter)

app.listen(5000,()=>{
    console.log("server is listening on port 5000")
})