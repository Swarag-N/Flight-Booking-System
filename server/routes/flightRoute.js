const express = require('express');
<<<<<<< HEAD
const createError = require('http-errors');
const router = express.Router();
const Flight = require('../models/Flight')
const auth = require('./middlewareAuth')

function countProperties(obj) {
    let count = 0;
    for (let property in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, property)) {
            count++;
        }
    }
    return count;
}

//READ
router.get('/', async function  (req, res) {
    if(req.query['upLimitTime'] || req.query['lowLimitTime']){
        req.query["time"]={}
        req.query['upLimitTime'] && (req.query["time"]['$lte']=req.query['upLimitTime'])
        req.query['lowLimitTime'] && (req.query["time"]['$gte']=req.query['lowLimitTime'])
        delete req.query['upLimitTime'];
        delete req.query['lowLimitTime'];
    }
    await Flight.find(req.query, (onerror, foundFlights) => {
        console.log(req.query)
        if (onerror) {
            res.send(onerror)
        } else {
            res.json(foundFlights)
        }
    });
});

router.get('/src',auth.authenticateToken,(req,res)=>{
    console.log(req.query.name)
    let trq = Flight.fuzzySearch('fl').exec();
    Flight.fuzzySearch('f').then(console.log).catch(console.error);
    console.log(trq.then())
    Flight.fuzzySearch({name:'Felicita'},(err,doc)=>{
        if (err) throw err
        console.log(doc)
    })
    res.sendStatus(200);
    // Flight.find(req.query,(err,foundFlights)=>{
    //     if (err) res.sendStatus(500,()=>{
    //         throw err
    //     })
    //     res.json(foundFlights)
    // })

})

router.get('/new',auth.authenticateToken,auth.isAgent ,(request, response) => {
    response.status(200).json()
});

router.post('/new',auth.authenticateToken,auth.isAgent, (request, response) => {
    console.log(request.body)
    if (countProperties(request.body) === 4) {
        Flight
            .create(request.body, (onerror, createdFlight) => {
            if (onerror) {
                console.warn(onerror);
                response.redirect("/");
            } else {
                response.json(createdFlight)
            }
        });
    } else {
        console.log(request.body)
        let err = createError(501);
        response.render('error', {
            "message": "Form not completely fulled",
            "error": err
        });
    }
});

//SHOW
router.get('/:id',auth.authenticateToken, (request, response) => {
    Flight
        .findById(request.params.id, (onerror, foundFlight
        ) => {
        if (onerror) {
            console.warn(onerror);
            response.redirect("/");
        } else {
            response.send(foundFlight)
        }
    })
});

//Update
router.put("/:id",auth.authenticateToken,auth.isAgent,(request,response)=>{
    Flight
        .findByIdAndUpdate(
        request.params.id,
        request.body,
        (onerror,updatedFlight)=> {
            if (onerror) {
                console.warn(onerror);
                response.status(500).send("Internal Error")
            } else {
                response.send(updatedFlight);
            }
        }
    )
});

//Delete
router.delete("/:id", auth.authenticateToken,auth.isAgent,(request, response) => {
    Flight.findByIdAndDelete(request.params.id, (onerror) => {
        if (onerror) {
            console.warn(onerror);
            response.redirect("/");
        } else {
            response.redirect("/flight");
        }
    })
});


module.exports = router;
=======
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
>>>>>>> master
