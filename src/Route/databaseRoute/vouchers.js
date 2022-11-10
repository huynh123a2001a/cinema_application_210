const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const connection = require('../connection.js');
router.get('/:id',(req, res)=>
{   
    var sql = "SELECT * FROM vouchers WHERE userID IS NULL OR userID ='"+req.params.id+"'";
    connection.query(sql, function(err, results) {
      if (err) throw err;
      results!=""?
      res.send(results):
      res.send(false);
    });
});
router.get('/',(req, res)=>
{
    res.send(false);
    // var sql = 'SELECT * FROM vouchers'
    // connection.query(sql, function(err, results)
    // {
    //     if (err) throw err;
    //     res.json(results);
    // })
});
module.exports = router