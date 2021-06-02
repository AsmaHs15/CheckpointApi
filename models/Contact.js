const mongoose = require ("mongoose")
const ContactScheme= new mongoose.Schema({

name : {
        type :String 
      //  required: true 
},

email:{
    type :String ,
    unique : true 
},

tel : {
    type :Number 
},


dateOfCreation : {
    type :Date ,
    default : Date.now()
},
})

module.exports =mongoose.model("contacts",ContactScheme)





