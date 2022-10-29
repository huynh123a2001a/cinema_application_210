const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const connection = require('../connection.js');

router.get('/',(req, res)=>
{
    var sql = 'SELECT * FROM combos'
    connection.query(sql, function(err, results)
    {
        if (err) throw err;
        res.json(results);
    })
});


module.exports = router