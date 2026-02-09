const jwt = require('jsonwebtoken')
const User = require('../Model/User')

const generateToken=async (id)=>{

    const signingin_user = await User.findById(id)

    const payload = {
        _id: signingin_user._id,
        name: signingin_user.name,
        email: signingin_user.email,
        role: signingin_user.role
    }

    const token = jwt.sign(payload, 'ANUSH')

    return token


}

module.exports = generateToken;





