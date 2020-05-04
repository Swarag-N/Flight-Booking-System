const express = require('express');
const createError = require('http-errors');
const router = express.Router();
const Flight = require('../models/Flight')

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
        // req.query["time"] = {$lte : new Date(req.query['upLimitTime']).toISOString(),$gte:new Date(req.query['lowLimitTime']).toISOString()}
        // req.query["time"] = {$lte:req.query['upLimitTime'],$gte:req.query['lowLimitTime']}
        req.query['upLimitTime'] && (req.query["time"]['$lte']=req.query['upLimitTime'])
        req.query['lowLimitTime'] && (req.query["time"]['$gte']=req.query['lowLimitTime'])
        delete req.query['upLimitTime'];
        delete req.query['lowLimitTime'];
    }
    await Flight.find(req.query, (onerror, foundFlights) => {
        console.log(req.query)
        if (onerror) {
            // console.warn(onerror);
            res.send(onerror)
        } else {
            res.json(foundFlights)
        }
    });
});

router.get('/new', (request, response) => {
    response.status(200).json()
});

router.post('/new', (request, response) => {
    console.log(request.body)
    if (countProperties(request.body) === 4) {
        Flight
            .create(request.body, (onerror, createdFlight) => {
            if (onerror) {
                console.warn(onerror);
                response.redirect("/");
            } else {
                response.json(createdFlight)
                // response.redirect("/flight
                // s/" + createdFlight.id.toString())
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
router.get('/:id', (request, response) => {
    Flight
        .findById(request.params.id, (onerror, foundFlight
        ) => {
        if (onerror) {
            console.warn(onerror);
            response.redirect("/");
        } else {
            response.send(foundFlight
            )
        }
    })
});

//Update
router.put("/:id",(request,response)=>{
    Flight
        .findByIdAndUpdate(
        request.params.id,
        request.body,
        (onerror,updatedflight)=> {
            if (onerror) {
                console.warn(onerror);
                response.redirect("/");
            } else {
                response.send(updatedflight
                );
            }
        }
    )
});

//Delete
router.delete("/:id", (request, response) => {
    Flight.findByIdAndDelete(request.params.id, (onerror) => {
        if (onerror) {
            console.warn(onerror);
            response.redirect("/");
        } else {
            response.redirect("/flight" +
                "s");
        }
    })
});


module.exports = router;