const mongoose = require("mongoose")

const contact_schema = new mongoose.Schema({


    name: {
        type: String,
        required: true
    },

    phonenumber: {

        type: String,
        required: true

    },

    email: {
        type: String,
        required: true
    }


}, {timestamps: true})

const Contact = mongoose.model("contact", contact_schema)

module.exports = Contact;