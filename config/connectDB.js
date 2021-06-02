const mongoose = require("mongoose")
const config = require("config")

const ConnectDB = async ()=>{

        try{
                await   mongoose.connect(config.get("MONGOURI"),
                {useUnifiedTopology:true , useNewUrlParser:true , useCreateIndex: true })

                console.log("Mongoose is  connected")
        }
        catch(err)
        {
                console.log(err)
        }
   
 
}

module.exports = ConnectDB