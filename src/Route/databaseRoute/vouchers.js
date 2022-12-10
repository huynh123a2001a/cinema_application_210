const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const connection = require('../connection.js');
const moment = require('moment');
router.get('/:id',(req, res)=>
{   
    timeNow=moment().utcOffset('+05:30').format('YYYY-MM-DD');
    var sql = "SELECT * FROM vouchers WHERE (userID IS NULL OR userID ='"+req.params.id+"') AND expiryDate >= '"+timeNow+"' AND amount > 0";
    connection.query(sql, function(err, results) {
      if (err) throw err;
      results.filter(time=>console.log(timeNow))
      results!=""?
      res.send(results):
      res.send(false);
    });
});
router.post('/',(req, res)=>
{
    console.log(req.body);
    try{
      req.body.code=req.body.code.trim();
    }
    catch(e)
    {
      console.log("Continue")
    }
    if(req.body.userID=="" || req.body.userID==null)
      return res.json("NOT FOUND USER")
    var sql = "SELECT * FROM vouchers WHERE voucherID='"+req.body.code+"' AND ( userID='"+req.body.userID+"' OR userID IS NULL);"
    connection.query(sql, function(err, results) {
      if (err) throw err;
      if(results!="")
      {
        // if((results.filter(date=>results.expiryDate.)))
        results.filter(date=>{
        if((moment().utcOffset('+05:30').format('YYYY-MM-DD'))>(moment(date.expiryDate).utcOffset('+07:00').format('YYYY-MM-DD')))
          return res.json('EXPIRYDATE')
        if(date.amount < 1)
          return res.json('AMOUNTZERO')
        res.send(results)
      })}
      else  
      {
        res.send(false);
      }
    })
});
module.exports = router