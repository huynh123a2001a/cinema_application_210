const express = require("express");
const films = express.Router();
const connection = require('../connection.js');
films.get('/',(req,res)=>
{
    var sql = "SELECT * FROM films";
    connection.query(sql, function(err, results) {
      if (err) throw err;
      res.json(results);
    });
});
films.get('/:id',(req, res)=>
{   
    var sql = "SELECT g.genreName FROM genres AS g, genredetails AS gd WHERE gd.filmID="+req.params.id+" AND gd.genreID = g.genreID"
    try{
    connection.query(sql, function(err, results) {
      if (err) throw err;
      res.json(results);
    });
    }
    catch (err)
    {
      res.json('Dữ liệu lỗi.')
    }
});
films.get('/:id',(req, res)=>
{   
    var sql = "SELECT d.directorName FROM directors AS d, films as f WHERE f.filmID="+req.params.id+" AND d.directorID = f.directorID"
    connection.query(sql, function(err, results) {
      if (err) throw err;
      res.json(results);
    });
});
module.exports = films;