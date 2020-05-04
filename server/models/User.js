const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:String,
    password:String,
    agent:Boolean
})

const User = mongoose.model('User',UserSchema)

module.exports = User