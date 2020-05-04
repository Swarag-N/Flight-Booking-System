const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/signup',async (req,res)=>{
  try {
    await bcrypt.hash(req.body.password, 10, function(err, hash) {
      if (err) throw  err
      console.log(req.body.password)
      req.body.password=hash
      User.create(req.body,(err,newUser)=>{
        if(err){
          res.send(500)
        }else{
          console.log(newUser)
          res.status(301).send('Success')
        }
      })
      // Store hash in your password DB.
    });
  } catch {
    res.status(500).send()
  }
})

// Todo { _id: 5eafffe34cda8a2c3430e7b1,
//   name: 'Coleman',
//   password:
//    '$2b$10$h3HkRnLts.qDgJUohIiZ9elssm.VTagTz8VDmd8mhWBk8UR6B9jhe',
//   agent: true,
//   __v: 0 }
router.post('/login', async (req, res) => {
  console.log(req.body)
   User.findOne({name:req.body.name},async (err,foundUser)=>{
    if (err) throw  err;
    if (!foundUser) throw "no user"
    try {
      if(await bcrypt.compare(req.body.password, foundUser.password)) {
        let nAme = foundUser.name
        let aGent = foundUser.agent
        let accessToken = jwt.sign({'name':nAme,'agent':aGent},"sfdsdfsdfsdfdsfsdfdsfsdfsdfsdfsdfsdf")
        res.json({accessToken:accessToken})
        // res.send("Success")
        console.log(foundUser,accessToken)
        // res.send('Success')
      } else {
        // let {name,agent} = foundUser

        res.send('Not Allowed')
      }
    } catch {
      res.status(500).send()
    }
  })
})

module.exports = router;
