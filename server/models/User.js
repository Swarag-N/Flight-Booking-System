const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    agent:{
        type:Boolean,
        required:true
    },
    rToken:{
        type:String
    }
})

const User = mongoose.model('User',UserSchema)

module.exports = User