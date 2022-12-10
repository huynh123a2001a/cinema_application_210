
const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const connection = require('../connection.js');
const moment = require('moment');
router.post('/',(req, res)=>
{
    var dateTime = moment()
    .utcOffset('+05:30')
    .format('YYYY-MM-DD hh:mm:ss');
    var sql;
    console.log(10);
    req.body.listTickets.filter(chairs=>
    {
        sql = "INSERT INTO tickets (`ticketName`, `createDate`, `status`, `showTimeID`, `userID`) VALUES ('"+chairs+"', '"+dateTime+"', 1,"+req.body.scheduleID+", '"+req.body.userID+"')"
        connection.query(sql)
    });
    console.log(11)
    res.send('TICKETADDSUCCESS');
});
router.get('/',(req, res)=>
{
    var sql = 'SELECT * FROM tickets'
    connection.query(sql, function(err, results)
    {
        if (err) throw err;
        res.json(results);
    })
});
router.get('/:id',(req, res)=>
{
    var sql = "select * from tickets AS t, schedules AS s, cinemAS AS c, films AS f, rooms AS r WHERE t.userID='"+req.params.id+"' AND s.scheduleID=t.showTimeID AND r.roomID=s.roomID AND f.filmID = s.filmID AND c.cinemaID=r.cinemaID;"
    connection.query(sql, function(err, result_tickets)
    {
        if (err) throw err;
        res.json(result_tickets)
    })
});
router.post('/billdetails/gettickets',(req, res)=>
{
    var sql = 'SELECT * FROM tickets WHERE billID='+req.body.id+''
    connection.query(sql, function(err, results)
    {
        if (err) throw err;
        res.send(results);
    })
});
router.post('/changeticket/chair',(req, res)=>
{
    var sql = "SELECT * FROM chairs WHERE chairName='"+req.body.newChooseChair+"' AND roomID="+req.body.roomID+" AND status=1"
    connection.query(sql, function(err, results)
    {
        if (err) throw err;
        if(results.length==0)
        {
            res.json("None")
        }
        else
        {
            sql = "UPDATE chairs SET `status` = 2 WHERE `chairName`='"+req.body.newChooseChair+"' AND `roomID` = "+req.body.roomID+""
            connection.query(sql, function(err)
            {
                if (err) throw err;
            }
            )
            sql = "UPDATE chairs SET `status` = 1 WHERE `chairName`='"+req.body.choosedChair+"' AND `roomID` = "+req.body.roomID+""
            connection.query(sql, function(err)
            {
                if (err) throw err;
            }
            )
            sql = "UPDATE tickets SET `ticketName` = '"+req.body.newChooseChair+"' WHERE `ticketID`="+req.body.ticketID+""
            connection.query(sql, function(err)
            {
                if (err) throw err;
            }
            )
            res.json("CHANGE SUCCESS");
        }
    })
});

router.post('/changeticket/user',(req, res)=>
{
    var sql = "SELECT * FROM users WHERE userName = '"+req.body.newUser+"'"
    console.log(req.body.newUser)
    connection.query(sql, function (err,resuilt){
        if (err) throw err;
        if(resuilt.length == 0)
        {
            res.json("CANTFINDUSER")
        }
        else
        {
            resuilt.filter(item => {
            sql= "UPDATE tickets SET `userID` ='"+item.userID+"' WHERE  `ticketID` = "+req.body.ticketID+" AND `userID`='"+req.body.userID+"'"
            connection.query(sql, function(err)
            {
                if (err) throw err;
                res.json("SUCCESS");
            })
            })
        }
    })
})
module.exports = router