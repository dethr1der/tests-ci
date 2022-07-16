var express = require('express');
var router = express.Router();
const calculator = require('../controllers/calculator')
const {query} = require('express-validator')

//Absolutely unuseful middleware but we can't calculate price without params so will return start price in 10000 PLN
const checkQuery = function (req, res, next) {
    if (Object.keys(req.query).length !== 0) {
        next()
    } else {
        res.status(200).send({price: 10000 + " PLN"})
    }
}
//You can ask me why get param ? Because we will calculate smth in real time and if it be a shop, it will be great to send your stairs configuration to your friend :))
router.get('/calc', checkQuery, [
    query('bends', "Bends must be a number between 0 and 5").isInt({
        min: 0,
        max: 5
    }),
    query('levels', "Levels must be an Integer number more than 0").isInt({min: 1}),
    query('height', "Total level of height can't be less than 0.5").isFloat({min: 0.5})
], calculator.calculate)

module.exports = router;
