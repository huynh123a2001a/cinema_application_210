export default function routes()
{
const mysql = require('mysql');
const express = require('express');
const PORT=3000;
const app = express();
const { v4: uuidv4 } = require('uuid');
const connection = mysql.createPool({
    connectionLimit: 10,
    host:'us-cdbr-east-06.cleardb.net',
    user:'b2cdc290465757',
    password:'6d1d13f4',
    database:'heroku_f48b8580a431194'
});
app.get('/films', function (req, res) {
    connection.getConnection(function (err, connection) {

    // Executing the MySQL query (select all data from the 'users' table).
    connection.query('SELECT * FROM films', function (error, results, fields) {
      // If some error occurs, we throw an error.
      if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results)
    });
  });
});
app.get('/users', function (req, res) {
    connection.getConnection(function (err, connection) {

    // Executing the MySQL query (select all data from the 'users' table).
    connection.query('SELECT * FROM users', function (error, results, fields) {
      // If some error occurs, we throw an error.
      if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results)
      console.log(results)
    });
  });
});
const id=24;
app.get('/films/'+id, function (req, res) {
    connection.getConnection(function (err, connection) {

    // Executing the MySQL query (select all data from the 'users' table).
    connection.query('SELECT * FROM films WHERE filmID='+id+'', function (error, results, fields) {
      // If some error occurs, we throw an error.
      if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results)
      
    });
  });
});
    return app.listen(3000,()=>console.log("data connection port: "+3000))
}