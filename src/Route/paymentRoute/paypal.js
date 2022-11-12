const express = require("express");
const route = express.Router();
var paypal = require('paypal-rest-sdk');
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AWRPbs1DySyaj5RuO4YW3dftBvv9g2FsUI5PoSol0xsgl4HrsXIA3zrdYs5_pwC0Mjs_gJ0UzqnxQEUI',
    'client_secret': 'EKhLBSv-BB0llenuuRxOReApOrEtLEFdAJwkL-Ts2E5vp85QKYLqEsw93SI6cd52xVEQ4Zj5Ou1YH0ya'
  });
route.get('/',(req, res)=>
{
    var create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "http://192.168.1.77:3001/paypal/success",
        "cancel_url": "http://192.168.1.77:3001/paypal/cancel",
    },
    "transactions": [{
        "item_list": {
            // "items": [req.body.items.map(item =>({
            //     "name": item.name,
            //     "sku": "none",
            //     "price": (req.items.price/24835).toFixed(2),
            //     "currency": "USD",
            //     "quantity": item.quantity
            "items": [{
                "name": "item",
                "sku": "none",
                "price": "12",
                "currency": "USD",
                "quantity": "1"
                }]},
        "amount": {
            "currency": "USD",
            // "total": (req.body.total/24835).toFixed(2),
            "total": "12"
        },
        "description": "This is the payment description."
    }]  
    };
    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            console.log("Create Payment Response");
            console.log(payment);
            res.redirect(payment.links[1].href)
        }
    })
}
)
route.get('/success', (req, res)=>{
    res.send("Success")
})
route.get('/cancel', (req, res)=>{
    res.send("Cancel");
})
module.exports = route;