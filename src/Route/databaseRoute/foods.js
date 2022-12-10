const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const connection = require('../connection.js');

router.get('/',(req, res)=>
{
    var sql = 'SELECT * FROM foods'
    connection.query(sql, function(err, results)
    {
        if (err) throw err;
        res.json(results);
    })
});
router.get('/:id',(req, res)=>
{
    var sql = 'SELECT * FROM foods WHERE foodID='+req.params.id+'';
    connection.query(sql, function(err, results)
    {
        if (err) throw err;
        res.json(results);
    })
});

router.post('/billdetails/getfoods',(req, res)=>
{
    var sql = 'SELECT * FROM foodbills WHERE billID='+req.body.id+'';
    connection.query(sql, function(err, results)
    {
        if (err) throw err;
        res.send(results);
    })
});

// router.post('/', (req, res) => {
    
// })
module.exports = router