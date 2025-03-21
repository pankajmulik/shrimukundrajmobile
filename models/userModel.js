const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        primary:true,
        unique:true
    },
    password: {
        type: String,
        required:true
    },
     name: {
        type: String,
        required:true
    },
    dob: {
         type:Date
    },
    mobilenumber: {
        type: Number,
        required: true,
        unique:true
    }
     

})


const UserAdmin = mongoose.model('UserAdmin', userSchema)

module.exports=UserAdmin
