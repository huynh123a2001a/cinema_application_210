const express = require("express");
const exchangerates = express.Router();
const connection = require('../connection.js');
exchangerates.get('/',(req,res)=>
{
    var sql = "SELECT * FROM exchangerates";
    connection.query(sql, function(err, results) {
      if (err) throw err;
      res.json(results);
    });
});
module.exports = exchangerates;