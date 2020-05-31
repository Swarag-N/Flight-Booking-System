const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken')
const SALT_ROUNDS = 10

generateAccessToken=(user)=>{
    return jwt.sign(user,process.env.ACCESS_TOKEN,{expiresIn: "10m"})
}

/* GET home page. */
router.get('/', function(req, res, next) {
    return res.render('index', { title: 'Express' });
});

router.post('/signup',async (req,res)=>{
    try {
        req.body.password = await bcrypt.hashSync(req.body.password, SALT_ROUNDS);
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


router.post('/token',async (req,res)=>{
    let token = req.body.token
    if (token==null) res.sendStatus(401)
    await  jwt.verify(token,process.env.REFRESH_TOKEN, (err,user)=>{
        if (err) return res.sendStatus(403)
         User.findById(user._id,async(err,foundUser)=>{
            if (err) return  res.sendStatus(500)
            if(!foundUser) return res.sendStatus(404,"UserNotFound")
            if (foundUser.rToken !== token) return res.status(401).send("User Generated a New Token or Expired")
            let accessToken = await generateAccessToken(user)
            res.json({accessToken:accessToken})
        })
    })
})


router.post('/login', async (req, res) => {
    await User.findOne({name:req.body.name},async (err,foundUser)=>{
        if (err) throw  err;
        if (!foundUser) throw "no user"
        try {
            let boolResult = await bcrypt.compare(req.body.password,foundUser.password)
            if(boolResult){
                let {name,agent,_id}=foundUser
                let user = {name,agent,_id}
                console.log(user)
                let accessToken = await generateAccessToken(user)
                    // let accessToken = jwt.sign(user,process.env.ACCESS_TOKEN,{expiresIn: "10m"})
                let refreshToken = jwt.sign(user,process.env.REFRESH_TOKEN)
                foundUser.rToken = refreshToken
                foundUser.save()
                res.status(202).json({accessToken,refreshToken})
            } else {
                res.status(401).json({foundUser})
            }
        } catch {
            res.status(500).send()
        }
    })
})

router.delete('/logout',async (req,res)=>{
    let token = req.body.token
    if (token==null) res.sendStatus(401)
    await  jwt.verify(token,process.env.REFRESH_TOKEN, (err,user)=>{
        if (err) return res.sendStatus(403)
        User.findById(user._id,async(err,foundUser)=>{
            if (err) return  res.sendStatus(500)
            if(!foundUser) return res.sendStatus(404,"UserNotFound")
            foundUser.rToken=null
            foundUser.save()
            res.sendStatus(202)
        })
    })
})

module.exports = router;
