const fake = require('faker');
const flight = require('./models/Flight')
const mongoose = require('mongoose');
require('dotenv').config()


mongoose.connect(`${process.env.DB_URI}`, {useNewUrlParser: true, useUnifiedTopology: true},()=>{
    console.log("Connected To DB")
});

async function seedFunction (){
    for (let i = 0; i < 10; i++) {
        let flightSample = {
            "name":fake.name.firstName(),
            "from":fake.address.city(),
            "to":fake.address.city(),
            "time":fake.date.recent(),
            "owned":"5eafffe34cda8a2c3430e7b1"
        }
        await flight.create(flightSample,(err,created)=>{
            if (err) throw  err;
            console.log(created);
        })
    }
}

seedFunction()

// flight.create(flightSample,(err,created)=>{
//     if (err) throw  err;
//     console.log(created);
//     mongoose.connection.close();
// })

console.log(flight)

// mongoose.connection.close()