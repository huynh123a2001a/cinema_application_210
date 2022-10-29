/*SELECT ad.addressID, ad.addressName, cn.cinemaID, cn.cinemaName FROM addresses AS ad, cinemas AS cn, rooms AS r, schedules AS st, films AS f
WHERE st.filmID = 24 AND r.roomID = st.roomID AND r.cinemaID = cn.cinemaID AND ad.addressID = cn.addressID 
GROUP BY ad.addressID, ad.addressName, cn.cinemaID, cn.cinemaName;*/
const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const connection = require('../connection.js');

router.get('/',(req, res)=>
{
    var sql = 'SELECT * FROM cinemas'
    connection.query(sql, function(err, results)
    {
        if (err) throw err;
        res.json(results);
    })
});

router.get('/:id',(req, res)=>
{   
    var sql = "SELECT ad.addressID, ad.addressName, ad.addressName1, cn.cinemaID, cn.cinemaName, cn.cinemaName1 FROM addresses AS ad, cinemas AS cn, rooms AS r, schedules AS st, films AS f WHERE st.filmID = "+req.params.id+" AND r.roomID = st.roomID AND r.cinemaID = cn.cinemaID AND ad.addressID = cn.addressID GROUP BY ad.addressID, ad.addressName, cn.cinemaID, cn.cinemaName";
    connection.query(sql, function(err, results) {
      if (err) throw err;
      results!=""?
      res.send(results):
      res.send(false);
    });
});

module.exports = router