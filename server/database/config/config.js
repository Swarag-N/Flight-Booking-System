require('dotenv').config({path: 'S:\\Projects\\9 Working\\Flight-Booking-System\\server\\db.env'})

module.exports = {
    development: {
        url: process.env.DB_URI,
        dialect: 'postgres',
    },
    test: {
        url: process.env.TEST_DATABASE_URL,
        dialect: 'postgres',
    },
    production: {
        url: process.env.DATABASE_URL,
        dialect: 'postgres',
    },
}