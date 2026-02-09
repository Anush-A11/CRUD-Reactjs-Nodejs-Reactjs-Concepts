const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const app = express()

// CONNECTION TO MONGO DB

mongoose.connect(process.env.MONGO_URL)
    .then(()=>{console.log("MongoDb is connected successfully!")})
    .catch(()=>{console.log("Err in connecting to MongoDb")})



const ContactRoutes = require('../backend/Routes/ContactRoutes')
const cors = require('cors')
const UserRoutes = require('../backend/Routes/UserRoutes')
const cookieparser = require('cookie-parser')


// MIDDLEWARE

app.use(express.json())  // Used to receive data from API when Content-Type: Application/json

app.use(express.urlencoded({extended: true})) // HTML FORM Submission Data

app.use(cookieparser())

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "PUT", "PATCH", "POST", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type","Authorization"]
}))


// ROUTES


app.use('/contacts', ContactRoutes)
app.use('/user', UserRoutes)


// LISTENING THE SERVER

app.listen(3000, ()=>{console.log("LISTENING ON PORT 3000")})