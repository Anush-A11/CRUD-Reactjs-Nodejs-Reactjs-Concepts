const express = require('express')
const mongoose = require('mongoose')

const app = express()

// CONNECTION TO MONGO DB

mongoose.connect("mongodb://localhost:27017/CRUD")
    .then(()=>{console.log("MongoDb is connected successfully!")})
    .catch(()=>{console.log("Err in connecting to MongoDb")})



const ContactRoutes = require('../backend/Routes/ContactRoutes')

// MIDDLEWARE

app.use(express.json())  // Used to receive data from API when Content-Type: Application/json

app.use(express.urlencoded({extended: true})) // HTML FORM Submission Data


// ROUTES





app.use('/contacts', ContactRoutes)





// LISTENING THE SERVER

app.listen(3000, ()=>{console.log("LISTENING ON PORT 3000")})