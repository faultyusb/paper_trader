const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

const Users = require('../models/Users');



router.get('/portfolios', ensureAuthenticated, (req, res) => {});

router.put('/stocktrans', (req, res) => {
    if (!req.user){
        return res.json({ errorMessage: "You must be signed in for this feature." });
    }

    if (!req.body.symbol || !req.body.price || !req.body.shares || !req.body.volume){
        return res.json({ errorMessage: "Invalid inputs: Empty fields" });
    }
    if(req.body.shares < 1){
        return res.json({ errorMessage: "You must transact with at least 1 share." });
    }

    // if mode set to buy
    if (req.body.buy){
        const stock = {
            symbol: req.body.symbol,
            price: req.body.price,
            shares: req.body.shares,
            volume: req.body.volume
        };
        console.log("Buying stocks!")
        Users.findOneAndUpdate({ _id: req.user._id }, { $push: {stocks: stock} }, {useFindAndModify: false}, (err, result) => {
            if (err){
                console.log("Error in buying stocks.");
            }
        });
    }

    // if mode set to sell
    else{
        console.log("Selling stock!");
        Users.findOneAndUpdate({_id: req.user._id, "stocks.symbol": req.body.symbol}, {$set: {"stocks.$.shares": req.body.shares}}, {useFindAndModify: false}, (err, res)=>{
            if (err){
                console.log("Something wrong with selling stocks.");
            }
        });
    }

});

module.exports = router;
