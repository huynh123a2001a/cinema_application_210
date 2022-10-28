const express = require("express");
const directors = express.Router();
const connection = require('../connection.js');
directors.get('/',(req,res)=>
{
    var sql = "SELECT * FROM directors";
    connection.query(sql, function(err, results) {
      if (err) throw err;
      res.json(results);
    });
});
directors.get('/:id',(req,res)=>
{
    var sql = "SELECT d.directorName FROM directors AS d, films as f WHERE f.filmID="+req.params.id+" AND d.directorID = f.directorID"
    connection.query(sql, function(err, results) {
      if (err) throw err;
      res.json(results);
    });
});
module.exports = directors;