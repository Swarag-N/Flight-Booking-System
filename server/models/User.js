const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const SALT_ROUNDS = 10

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required:true
    },
    agent:{
        type:Boolean,
        required:true
    }
})

UserSchema.pre('save', function(next){
    this.password = bcrypt.hashSync(this.password, SALT_ROUNDS);
    next();
});
const User = mongoose.model('User',UserSchema)

module.exports = User