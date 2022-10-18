const mysql = require('mysql');
const condata = mysql.createPool({
    connectionLimit: 10,
    host:'us-cdbr-east-06.cleardb.net',
    user:'b2cdc290465757',
    password:'6d1d13f4',
    database:'heroku_f48b8580a431194'
});
module.exports=condata;
