const express = require('express')
const routes = express.Router()
const Contacts = require('../Model/Contact')


// {CREATE} : POST-ROUTE FOR CREATING NEW CONTACT

routes.post('/add-contact',async(req, res)=>{

    // RECEIVE THE DATA FROM FRONTEND VIA req.body

    const {name, phonenumber, email} = req.body



    try{

    // SEARCH FOR EXISTING CONTACT WITH SAME EMAIL

    const existing_contact = await Contacts.findOne({email})

    if(existing_contact) throw new Error(`Contact with ${email} already exists!`)
    

    // IF NOT ADD CONTACT TO THE API "/contacts/add-contact"

    const new_contact = await Contacts.create({
        name,
        phonenumber,
        email

    })

    // AFTER ADDING SEND MESSAGE TO THE FRONT END WITH THE CREATION OF CONTACT AS SUCCESSFUL

    res.json({
        message: `Successfully created a new contact with the name as ${name}, along wth ${email} as the official email and ${phonenumber} as the official phone number`
    })


    }catch(err){

        res.json({
            errmsg: err.message
        })
    }



})


// {Read} GET - ROUTE FOR DISPLAYING ALL THE CONTACTS

routes.get('/all-contacts',async(req, res)=>{

    try{

    // GETTING ALL THE CONTACTS FROM MONGO DB

    const all_contacts = await Contacts.find()

    console.log(all_contacts);
    

    // SENDING ALL THE CONTACTS AS JSON RESPONSE 

    res.json(all_contacts)


    }catch(err){

        res.json({

            error_message: err.message
        })
    }


})

// {Read} GET - ROUTE FOR DISPLAYING ONE OF THE CONTACTS

routes.get('/:id', async (req,res)=>{

    try{

    // GETTING ID OR EMAIL FROM req.params

    const {id} = req.params

    // SEARCHING AND FINDING THAT PARTICULAR CONTACT

    const contact_to_be_displayed = await Contacts.findById(id)
    

    // SENDING THAT PARTICULAR CONTACT AS JSON RESPONSE

    res.json(contact_to_be_displayed)


    }catch(error){

        res.json({
            error: error.message
        })

    }


})

// {Update} - ROUTE FOR UPDATING EXISTING CONTACT

routes.patch('/:id', async(req,res)=>{

    try{

        // GETTING ID FROM req.params

        const {id} = req.params

        // GETTING UPDATED DATA FROM THE PARAMS

        const updates = req.body

        // FINDING THE RESPECTIVE CONTACT FROM THE MONGO DB AND UPDATING THE FIELD


        const updated_contact = await Contacts.findByIdAndUpdate(id, updates,{new: true, runValidators: true})


        // SENDING THE UPDATED CONTACT TO THE FRONT-END

        res.json(updated_contact)



    }catch(error){

        res.json({
            error: error.message
        })

    }


})

// DELETE - ROUTES FOR DELETING A CONTACT

routes.delete('/:id',async(req, res)=>{

    try{

    // GETTING ID FROM req.params

    const {id} = req.params

    // FINDING AND DELETING THE CONCERNED OBJECT
    
    const deleted_contact = await Contacts.findByIdAndDelete(id)

    // SENDING THE MESSAGE SUCCESSFUL TO THE FRONT END

    res.json({
        message: "Deletion Successful"
    })


    }catch(error){

        res.json({
            message: "Deletion unsuccessful"
        })
    }


})


module.exports = routes

