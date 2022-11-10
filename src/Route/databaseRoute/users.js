const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const connection = require('../connection.js');
const CryptoJS = require('crypto-JS');
const tripledes = require('crypto-js/tripledes');
const moment = require('moment');
router.get('/',(req, res)=>
{
    res.send("don't check user");
});
router.get('/:id',(req, res)=>
{   
    var sql = "SELECT userID FROM users WHERE userID=\""+req.params.id+"\"";
    connection.query(sql, function(err, results) {
      if (err) throw err;
      results!=""?
      res.send(results):
      res.send(false);
    });
});
router.post('/login',(req,res)=>{
    console.log(1);
    setUsername =req.body.username;
    setPassword =req.body.password;
    var passDES ="";
    var setKey="cinema210";
    var setID = uuidv4();
    console.log(2+":"+setUsername+":"+setPassword);
    var sql = "SELECT * FROM users WHERE userName=\""+setUsername+"\"";
    connection.query(sql, function(err,results) {
        
            results.map((pass)=>{return passDES=pass.password,setID=pass.userID})
            passDES = CryptoJS.TripleDES.decrypt(passDES, setKey).toString((CryptoJS.enc.Utf8))
            setPassword==passDES?
            (
                console.log("Loggin success"),
                sql = "SELECT * FROM memberships WHERE userID=\""+setID+"\"",
                connection.query(sql, function(err,resultsmember) {
                    resultsmember==""?
                        res.json({user:results,member:false})
                    :
                        res.json({user:results,member:resultsmember})
                })
            )
            :
            (
                console.log("Loggin failed"),
                res.json(false)
            )
            
        });
});

router.post('/signup',(req,res)=>{
    
    setUsername =req.body.username;
    setPassword =req.body.password;
    setEmail = req.body.email;
    setFullName = req.body.fullName;
    setAddress = req.body.address+" ";
    var dateTime = moment()
      .utcOffset('+05:30')
      .format('YYYY-MM-DD hh:mm:ss');
    let permission = 0;
    var setKey="cinema210";
    var createID = uuidv4();
    console.log(2+":"+setUsername+":"+setPassword);
    var sql = "SELECT userID FROM users WHERE userName=\""+setUsername+"\"";
    connection.query(sql, function(err,results) {
        console.log(3+":sql:"+sql+":results:");
        console.log(results);
        if(results!="")
        {
            res.json(false)
        }else
        {
                console.log(4);
                setPassword = CryptoJS.TripleDES.encrypt(setPassword, setKey);
                console.log(5 +":cryp:"+setPassword);
                sql = "INSERT INTO users (`userID`,`userName`,`password`,`address`, `email`, `createDate`, `fullName`, `permissions`) VALUES ('"+createID+"','"+setUsername+"','"+setPassword+"','"+setAddress+"','"+setEmail+"','"+dateTime+"','"+setFullName+"',"+permission+")";
                connection.query(sql);
                res.json(createID);
        }
        });
});
module.exports = router;
//var desparam = CryptoJS.TripleDES.decrypt("U2FsdGVkX1+hfJHu5jzxoecJrhXV7XLSx3il7PDeQlI=", setKey).toString((CryptoJS.enc.Utf8));
//usertestconnection
