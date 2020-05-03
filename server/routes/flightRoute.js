const express = require('express');
const router = express.Router();
const Flight = require('../models/Flight')

router.get('/',(res,req)=>{
    Flight.findAll()
        .then(f=>console.log(f))
        .catch(err=>{
            console.log(err)
        })
})

module.exports = router