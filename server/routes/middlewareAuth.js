const jwt = require('jsonwebtoken')
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

function isAgent(req,res,next){
    if (req.user.agent){
        next()
    }else{
        res.status(401).send("Not Agent")
    }
}

module.exports = {authenticateToken,isAgent}