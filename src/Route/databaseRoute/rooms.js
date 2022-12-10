const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const connection = require('../connection.js');

// router.get('/',(req, res)=>
// {
//     var sql = 'SELECT * FROM rooms'
//     connection.query(sql, function(err, results)
//     {
//         if (err) throw err;
//         res.json(results);
//     })
// });
// router.get('/:id',(req, res)=>
// {
//     var sql = 'SELECT * FROM rooms WHERE roomID='+req.params.id+'';
//     connection.query(sql, function(err, results)
//     {
//         if (err) throw err;
//         res.json(results);
//     })
// });

router.post('/schedules/billdetails/getroom',(req, res)=>
{
    var sql = 'SELECT * FROM schedules WHERE scheduleID='+req.body.id+'';
    connection.query(sql, function(err, results)
    {
        if(err) throw err;
        var roomID;
        results.filter(item=>roomID=item.roomID);
        sql = "SELECT * FROM rooms WHERE roomID="+roomID+"";
        connection.query(sql, function(err, result)
        {
            if(err) throw err;
            res.send(result);
        })  
    })
});

// router.post('/', (req, res) => {
    
// })
module.exports = router