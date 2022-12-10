const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const connection = require('../connection.js');

router.get('/',(req, res)=>
{
    var sql = 'SELECT * FROM schedule'
    connection.query(sql, function(err, results)
    {
        if (err) throw err;
        res.json(results);
    })
});

router.post('/',(req, res)=>
{   
    var sql = "SELECT * FROM schedules AS st, rooms AS r, cinemas AS cn WHERE st.filmID="+req.body.filmID+" AND st.roomID = r.roomID AND r.cinemaID = cn.cinemaID AND cn.cinemaID="+req.body.cinemaID+" ORDER BY st.showTime ASC";
    connection.query(sql, function(err, results) {
      if (err) throw err;
      results!=""?
      res.json(results):
      res.send(false);
    });
});
router.post('/billdetails',(req, res)=>
{   
    var sql = "SELECT * FROM schedules WHERE scheduleID="+req.body.id+"";
    connection.query(sql, function(err, results) {
      if (err) throw err;
      results!=""?
      res.json(results):
      res.send(false);
    });
});

module.exports = router