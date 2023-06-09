const userRoutes = require('./databaseRoute/users.js');
const filmRoutes = require('./databaseRoute/films.js');
const directorRoutes = require('./databaseRoute/directors.js');
const branchs = require('./databaseRoute/branchs.js');
const showtimes = require('./databaseRoute/schedules.js');
const chairs = require('./databaseRoute/chairs.js');
const foods = require('./databaseRoute/foods.js');
const combos = require('./databaseRoute/combos.js');
const tickets = require('./databaseRoute/tickets.js');
const vouchers = require('./databaseRoute/vouchers.js');
const exchangerates = require('./databaseRoute/exchangerates.js');
const bills = require('./databaseRoute/bills.js');
const rooms = require('./databaseRoute/rooms.js');
const feedbacks = require('./databaseRoute/feedbacks.js');
const news = require('./databaseRoute/news.js');
const paypal = require('./paypal.js');
const connection = require('./connection.js');
const express = require('express');
const PORT=3001;
const app = express();
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use('/users',userRoutes);
app.use('/films',filmRoutes);
app.use('/directors',directorRoutes);
app.use('/branchs',branchs);
app.use('/showtimes',showtimes);
app.use('/chairs',chairs);
app.use('/foods',foods);
app.use('/combos',combos);
app.use('/vouchers',vouchers);
app.use('/paypal',paypal);
app.use('/tickets',tickets);
app.use('/rooms',rooms);
app.use('/exchangerates',exchangerates);
app.use('/bills',bills);
app.use('/feedbacks',feedbacks);
app.use('/news',news);
app.get('/',(req, res)=>{
    res.sendFile('/Users/tuocloi/Development/CinemaApp/src/Route/WebView/index.html')
})
app.listen(PORT,()=>console.log("data connection port: "+PORT))