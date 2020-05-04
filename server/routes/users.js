const express = require('express');
const router = express.Router();
const Flight = require('../models/Flight')
/* GET users listing. */
router.get('/', function(req, res, next) {
  Flight.find((onError,data)=>{
    if (onError) throw onError
    console.log(data)
  })
  res.send('respond with a resource');
});

module.exports = router;
