const express = require("express");
const router = express.Router();
const connection = require('../connection.js');

router.get('/',(req, res)=>
{
    var sql = 'SELECT * FROM chairs'
    connection.query(sql, function(err, results)
    {
        if (err) throw err;
        res.json(results);
    })
});

router.post('/',(req, res)=>
{   
    var sql = "SELECT * FROM chairs where roomID="+req.body.roomID+"";
    connection.query(sql, function(err, results) {
      if (err) throw err;
      results!=""?
      res.json(results):
      res.send(false);
    });
});
router.post('/create',(req, res)=>{
    
})

module.exports = router