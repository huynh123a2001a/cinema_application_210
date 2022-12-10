const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const connection = require('../connection.js');
const moment = require('moment');
const { end } = require("../connection.js");

router.get('/:id', (req, res) => {
    var sql = "SELECT * FROM bills WHERE userID='" + req.params.id + "'"
    connection.query(sql, function (err, resuilt) {
        if (err) throw err;
        res.json(resuilt)
    })
})
router.post('/', (req, res) => {
    var createIDBill = uuidv4();
    var sql = 0;
    var dateTime = moment()
        .utcOffset('+05:30')
        .format('YYYY-MM-DD hh:mm:ss');
    
    sql = "INSERT INTO bills (`billName`,`billName1`,`paymentID`,`createDate`,`status`,`billTotal`,`userID`) VALUES ('Hoá đơn thanh toán','Payment bill',4,'" + dateTime + "',1," + req.body.total + ",'" + req.body.userID + "')";
    if (req.body.listItem.discountVoucher && req.body.listItem.discountVoucher != 0) {
        req.body.total = req.body.total - req.body.listItem.discountVoucher;
        sql = "UPDATE vouchers SET `amount` = `amount`-1 WHERE `voucherID` = '" + req.body.listItem.voucher + "'";
        connection.query(sql)
        sql = "INSERT INTO bills (`billName`,`billName1`,`paymentID`,`createDate`,`status`,`billTotal`,`userID`,`voucherID`) VALUES ('Hoá đơn thanh toán','Payment bill',4,'" + dateTime + "',1," + req.body.total + ",'" + req.body.userID + "','" + req.body.listItem.voucher.trim() + "')";
    }
    connection.query(sql, function (err, result) {
        if (err) throw err;
        sql = "UPDATE memberships SET `points` = `points`+" + Math.floor(req.body.total / 10000) + " WHERE `userID`='" + req.body.userID + "'";
        connection.query(sql);
        req.body.listItem.foods.filter(foods => {
            if (foods.foodID) {
                sql = "SELECT * FROM foods WHERE foodID=" + foods.foodID + ""
                connection.query(sql, function (err, resultz) {
                    if (err) throw err;
                    resultz.filter(item => {
                        sql = "INSERT INTO foodbills (`foodName`,`foodName1`,`userID`,`billID`,`price`,`quantity`) VALUES ('" + item.foodName + "','" + item.foodName1 + "','" + req.body.userID + "','" +result.insertId+ "','" + item.foodprice + "',"+foods.quantity+")"
                        connection.query(sql);
                    })
                })
            }
            else{
                sql = "SELECT * FROM combos WHERE comboID=" + foods.comboID + ""
                connection.query(sql, function (err, resultz) {
                    if (err) throw err;
                    resultz.filter(item => {
                        sql = "INSERT INTO foodbills (`foodName`,`foodName1`,`userID`,`billID`,`price`,`quantity`) VALUES ('" + item.comboName + "','" + item.comboName1 + "','" + req.body.userID + "','" +result.insertId+ "','" + item.comboPrice + "',"+foods.quantity+")"
                        connection.query(sql);
                    })
                })
            }
        }
        )
        req.body.listItem.chairs.filter(chair => {
            sql = "UPDATE chairs SET `status`=2 WHERE `chairName` = '" + chair + "' AND `roomID` = " + req.body.listItem.roomID + ""
            connection.query(sql)
            sql = "INSERT INTO tickets (`ticketName`, `createDate`, `status`, `showTimeID`, `userID`, `billID`) VALUES ('" + chair + "','" + dateTime + "',1," + req.body.listItem.scheduleID + ",'" + req.body.userID + "','" +result.insertId+ "')"
            connection.query(sql)
        }
        )
        return res.json(result.insertId)
    })
});
router.post('/create', (req, res) => {
    req.body.listItem.foods.filter(item => {
        if (item.comboID) {
            sql = "INSERT INTO billdetails (`billID`, `comboID`, `priceDetail`, `quantity`) VALUES (" + req.body.billID + "," + item.comboID + "," + item.comboPrice + "," + item.quantity + ")"
            connection.query(sql, function (err) {
                if (err) res.json('ERRISCB')
            })
        }
        else {
            sql = "INSERT INTO billdetails (`billID`, `foodID`, `priceDetail`, `quantity`) VALUES (" + req.body.billID + "," + item.foodID + "," + item.foodPrice + "," + item.quantity + ")"
            connection.query(sql, function (err) {
                if (err) res.json('ERRISF')
            })
        }
    })
    console.log(16)
    req.body.listItem.chairs.filter(item => {
        sql = "SELECT * FROM tickets as t WHERE t.showTimeID = " + req.body.listItem.scheduleID + " AND t.ticketName='" + item + "'"
        connection.query(sql, function (err, result) {
            if (err) res.json('ERRSLTKID');
            result.filter(ticket => {
                sql = "INSERT INTO billdetails (`billID`, `ticketID`, `priceDetail`, `quantity`) VALUES (" + req.body.billID + "," + ticket.ticketID + "," + req.body.listItem.priceTicket + ",1)"
                connection.query(sql, function (err) {
                    if (err) res.json('ERRTKBILL')
                });
            })
        })
    })
    return res.json('SUCCESS')
})
module.exports = router