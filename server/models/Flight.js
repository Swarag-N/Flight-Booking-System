const mongoose = require('mongoose');
const User = require('./User')

const FlightSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    from:String,
    to:String,
    time:Date,
    owned:{
        type:mongoose.Schema.Types.Object,
        ref:User,
        required: true
    }
})
const  Flight = mongoose.model('Flight',FlightSchema)

module.exports = Flight