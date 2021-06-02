const router = require("express").Router()
const Contact  = require("../models/contact")

// @path : http://localhost:5000/api/contacts/
// get all contacts
// Private or Public

router.get("/", async (req,res)=>{
try {
        const users =  await Contact.find()
        res.send({msg:"Contacts fetched", users})
} catch (err)
{console.log(err)}
})



// @path : http://localhost:5000/api/contacts/:id
// get contact by id
// Private or Public

router.get("/:id", async (req,res)=>{
    try {
            const user =  await Contact.findById(req.params.id)
            if (!user)
            {
                res.json({msg:"Please check the id "})

            }
            res.json({msg:"contact by id is fetched", user})

    } catch (err)
    {console.log(err)}
    })


// @path : http://localhost:5000/api/contacts/addContact
// add  contacts
// Private or Public

router.post("/addContact", async (req,res)=>{
        
    try {
        const newUser = new Contact({ ...req.body })

       // name and email are required !! 
       if (!newUser.name || !newUser.email) {
        return res.status(400).json({ msg: 'Please include a name and an email' });
            }
          // check if : name and email do not already  exists
          const users =  await Contact.find()
               if( await users.find((user) => user.name.toString() === newUser.name)  || ( await  users.find(( user) => user.email.toString() === newUser.email)) )
            {
                return res.status(404).json({ msg: 'Name / Email already exists! please include another one !!' });
            }
        // add contact 
      const newContact = await  newUser.save()
       res.json({msg: "Contact created", newContact})

    } catch (err)
     {
         console.log(err)
    }
})


// @path : http://localhost:5000/api/contacts/editContact/:id
// update contact
// Private or Public

router.put("/editContact/:id", async  (req, res)=>{
   
    try {
        let toUpdateUser = await Contact.findById(req.params.id)
           
       if (!toUpdateUser)
       {
         return res.status(404).send('Contact  Not Found!');
       }  

        toUpdateUser =  await  Contact.findOneAndUpdate({_id :req.params.id}, {$set:{ ...req.body}})
        const users =  await Contact.find()

        res.json ({msg:"Contact updated", users })
       

    } catch (err)  {
        console.log(err)
    }
 })

// @path : http://localhost:5000/api/contacts/deleteContact/:id
// delete  contact
// Private or Public

router.delete("/deleteContact/:id", async  (req, res)=>{
    try {
   
        let deletedUser = await Contact.findById(req.params.id)
        if (!deletedUser)
        {
            res.json({msg:"Please check the id !!"})
        }

         deletedUser = await  Contact.findOneAndDelete({_id : req.params.id})
         const users =  await Contact.find()
         res.json({msg:"Contact deleted !", users })

    } catch (err)  {
        console.log(err)
    }
 })


module.exports = router 