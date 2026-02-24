const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const app = express()
const {GetParameterCommand, SSMClient} = require('@aws-sdk/client-ssm')

// CONNECTION TO AWS & MONGO DB

const getmongoUri = async ()=>{

    if(process.env.MONGO_URL){
        return process.env.MONGO_URL
    }

    const client = new SSMClient({region: "us-east-1"})
    const command = new GetParameterCommand({
        Name: "/CRUD-Reactjs-Nodejs-Reactjs-Concepts/backend/MONGO_URL",
        WithDecryption: true
    })

    const response = await client.send(command)

    return response.Parameter.Value

}

// FUNCTION FOR CONNECTING TO AWS / MONGO DB AND STARTING THE PRODUCTION APP

const startApp = async ()=>{

    
try{

// GETTING PARAMETER BEFORE CONNECTING SERVER

    
const mongodb_url = await getmongoUri()

    await mongoose.connect(mongodb_url)
    
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


}catch(err){

    console.error('Error in connecting the Server: ' + err)
    process.exit(1)
}

}

// STARTING THE APP


startApp()




