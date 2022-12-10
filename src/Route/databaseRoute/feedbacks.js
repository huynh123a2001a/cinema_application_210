const express = require("express");
const route = express.Router();
const connection = require('../connection.js');
const moment = require('moment');
route.post('/',(req,res)=>
{
    var dateTime = moment()
      .utcOffset('+05:30')
      .format('YYYY-MM-DD hh:mm:ss');
    var sql = "INSERT INTO feedbacks(`message`,`email`,`phone`,`userID`,`createDate`) VALUES ('"+req.body.message+"| Improve: "+req.body.improve+"','"+req.body.email+"','"+req.body.phone+"','"+req.body.userID+"','"+dateTime+"')";
    connection.query(sql, function(err) {
      if (err) throw err;
      res.json('SUCCESS');
    });
});
module.exports = route;