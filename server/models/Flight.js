const mongoose = require('mongoose');

const FlightSchema = new mongoose.Schema({
    name:String,
    from:String,
    to:String,
    time:Date,
})
const  Flight = mongoose.model('Flight',FlightSchema)

module.exports = Flight