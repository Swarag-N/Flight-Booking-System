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
        User.create(req.body,(err,newUser)=>{
            if(err){
                res.send(500)
            }else{
                res.status(202).send([newUser,req.body])
            }
        })
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
    await User.findOne({name:req.body.name},async (err,foundUser)=>{
        if (err) throw  err;
        if (!foundUser) throw "no user"
        try {
            if(await bcrypt.compare(req.body.password, foundUser.password)) {
                let {name,agent}=foundUser
                let accessToken = jwt.sign({'name':name,'agent':agent},"sfdsdfsdfsdfdsfsdfdsfsdfsdfsdfsdfsdf")
                res.json({accessToken:accessToken})
                console.log(foundUser,accessToken)
            } else {
                res.send('Not Allowed')
            }
        } catch {
            res.status(500).send()
        }
    })
})

module.exports = router;
