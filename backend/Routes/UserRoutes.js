const express = require('express')
const routes = express.Router()
const User = require('../Model/User')
const bcrypt = require('bcrypt')
const generateToken = require('../Utils/Utils')


// SIGN UP ROUTE - LOGIC FOR NEW USER SIGN UP

routes.post("/sign-up", async(req,res)=>{

    const {name,email,password} = req.body
    const saltrounds = 10

    try{

        // IF Fields are empty

        if(!name || !email || !password) throw new Error("All Fields are Mandatory !")
        
        // IF user already exists

        const signingup_user = await User.findOne({email})

        if(signingup_user) throw new Error("User Already Exists !")
 
        // If User is New 

        // HASH PASSWORD

        const hashedPassword= await bcrypt.hash(password, saltrounds)

        //CREATE NEW USER

        const new_user = await User.create({
            name,
            email,
            password: hashedPassword
        })



        // Respose back to front end

        res.status(200).json({
            message: `User with the name ${name} Created Successfully!`
        })
        

    }catch(err){
        res.status(401).json({
            message: err.message
        })
    }

})


// SIGN IN - LOGOC FOR EXISTING USER SIGN IN AND ASSIGNING JWT TOKEN AND STORING USER DETAILS 



routes.post("/sign-in",async(req,res)=>{


   const {email, password} = req.body

   try{

    // IF No EMAIL / PASSWORD SEND USER ALL FIELDS ARE MANDATORY

    if(!email || !password) throw new Error("Both Email and Password required for Login!")

    // FIND RESPECTIVE USER FROM DATABASE

    const signingin_user = await User.findOne({email})
    
    if(!signingin_user) throw new Error("No User with the email address found")
    
    // HASHED PASSWORD TO NORMAL PASSWORD // VERIFY IF BOTHE PASSWORDS ARE SAME

    const password_match = await bcrypt.compare(password, signingin_user.password)

    // IF PASSWORDS DO NOT MATCH THROW ERROR


    if(password_match === false) throw new Error("Passwords Do not Match")


    //IF PASSWORDS MATCH ALLOW THE USER BY SENDING SUCCESS MSG TO FRONTEND

    if(password_match === true){
        
        // Generate Token 


        const token = await generateToken(signingin_user._id)


        // ASSIGN TOKEN TO COOKIES

        res.status(200).cookie("token", token,{
            httpOnly: true, // TRUE AS IT PREVENTS HACKERS AND THIRD PARTY JS TO READ DATA
            secure: false, // CHANGE TO TRUE WHEN DEPLOYED IN AWS
            sameSite: "lax",

        }).json({
            message: `Login Successful for the user with ${email}!`,
            id: signingin_user.id,
            name: signingin_user.name,
            email: signingin_user.email,
            role: signingin_user.role,
            token
        })
    }


   }catch(err){

    res.status(401).json({
        message: err.message
    })
   }


})

module.exports = routes