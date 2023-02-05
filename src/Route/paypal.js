const express = require("express");
const route = express.Router();
var paypal = require('paypal-rest-sdk');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const connection = require('./connection.js');
const localhost = require('./configAPIIP')
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AWRPbs1DySyaj5RuO4YW3dftBvv9g2FsUI5PoSol0xsgl4HrsXIA3zrdYs5_pwC0Mjs_gJ0UzqnxQEUI',
    'client_secret': 'EKhLBSv-BB0llenuuRxOReApOrEtLEFdAJwkL-Ts2E5vp85QKYLqEsw93SI6cd52xVEQ4Zj5Ou1YH0ya'
  });
route.get('/:total',(req, res)=>
{
    var sql="SELECT * FROM exchangerates WHERE type=\"USD\"";
    var exchangerate;
    connection.query(sql, function(err, results) {
        if (err) throw err;
        if (results.length==null)
            res.json(false);
        results.filter(ex => exchangerate=ex.exchangeRate)
        var create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": localhost+"/paypal/"+req.params.total+"/success",
            "cancel_url": localhost+"/paypal/"+req.params.total+"/cancel",
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "Buy cinema tickets",
                    "sku": "Buy cinema tickets",
                    "price": (req.params.total/exchangerate).toFixed(2),
                    "currency": "USD",
                    "quantity": "1"
                    }]},
            "amount": {
                "currency": "USD",
                "total": (req.params.total/exchangerate).toFixed(2),
            },
            "description": "This is the payment description."
        }]  
    };
    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            console.log("Create Payment Response");
            console.log(payment.transactions);
            res.redirect(payment.links[1].href)
        }
    })
    });
}
)
route.get('/:total/success',(req, res)=>
{
    try{
        res.sendFile('/Users/nguyentuanquynh/Development/projects/CinemaApp/src/Route/WebView/paymentSuccess.html')
        return;
    }
    catch (e)
    {
        console.log(e)
    }
    
})
route.get('/cancel', (req, res)=>{
    res.sendFile('/Users/tuocloi/Development/CinemaApp/src/Route/WebView/paymentFailed.html');
    return;
})
module.exports = route;