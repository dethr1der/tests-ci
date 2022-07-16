//If you agree I would ask you to prepare simple Node.js + express project that will have and endpoint to calculate the price of stairs basing on 3 factors:
// 1) number of bends/turns (0-5) each bend extends the price by 1000 pln
// 2) total number of levels each level - 200 pln
// 3) total value of height -  each 0.5 meter - 1000 pln
// 4) type of material (wood - no extra money, marble - extra 200 pln per each level, composite - extra 50 pln per each level)
// 5) type of handrail material (wood - no extra money, metal - extra 2000). The base price for any stairs is 10000
const {validationResult, check} = require('express-validator');


function getMaterialTypePrice(material) {
    const materialsPrices = {
        wood: 0,
        marble: 200,
        composite: 50
    }
    return !materialsPrices[material] ? 0 : materialsPrices[material];
}

function getHandrailTypePrice(handrail) {
    const handrails = {
        wood: 0,
        metal: 2000,
    }
    return !handrails[handrail] ? 0 : handrails[handrail];
}

class StairsCalculator {


    calculate(req, res) {

        function checkOnProvided(params){
            let check = []
            params.forEach(param =>{
                if(!param){
                  check.push(true)
                }
            })

            if(check.length > 0) {
                return res.status(400).send({error: "The required value is not provided"})
            }
        }

        const bends = req.query.bends
        const numOfLevels = req.query.levels
        const height = req.query.height
        const material = req.query.material
        const handRailMaterial = req.query.handrail

        checkOnProvided([bends, numOfLevels, height])

        let price = 10000 + bends * 1000 + numOfLevels * 200 + ((1000 * height) + 1000) + getMaterialTypePrice(material) * numOfLevels + getHandrailTypePrice(handRailMaterial)

        res.status(200).send({price: price + " PLN"})
    }
}

module.exports = new StairsCalculator();