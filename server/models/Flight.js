const mongoose = require('mongoose');
const User = require('./User')
const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');

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

FlightSchema.plugin(mongoose_fuzzy_searching,{
    fields:[
        {
            name: 'name',
            weight: 3
        },
        'from',
        'to',
        {
            name:'time',
            weight: 10,
        }
    ]
})
const  Flight = mongoose.model('Flight',FlightSchema)

module.exports = Flight