const express = require("express")
const connect = require("./config/connectDB")


// initialisation des fonctionnalitées express 
const app = express ()

//middelware

app.use(express.json());

//Connect to dB
connect()

//routes

app.use("/api/contacts", require("./routes/contact"))

//port
const port = 5000
app.listen(port, err =>{

    err? console.log(err): console.log(`server is running on port ${port}`)

})
