const express = require('express');
const mysql = require('mysql');
const app = express();

const connection = mysql.createPool({
  host: 'us-cdbr-east-06.cleardb.net',
  user: 'b2cdc290465757',
  password: '6d1d13f4',
  database: 'heroku_f48b8580a431194'
});

// Creating a GET route that returns data from the 'users' table.
app.get('/films', function (req, res) {
    // Connecting to the database.
    connection.getConnection(function (err, connection) {

    // Executing the MySQL query (select all data from the 'users' table).
    connection.query('SELECT * FROM films WHERE filmID=14', function (error, results, fields) {
      // If some error occurs, we throw an error.
      if (error) throw error;

      // Getting the 'response' from the database and sending it to our route. This is were the data is.
      res.send(results)
    });
  });
});

// Starting our server.
app.listen(3000, () => {
 console.log('Go to http://localhost:3000/films so you can see the data.');
});