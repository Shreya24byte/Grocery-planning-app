var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
require("dotenv").config();
const mongoose = require('mongoose');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const groceryRouter = require('./routes/grocery');

mongoose.connect(
    process.env.MONGO_SERVER_URL,
     {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  },
  function(err) {
      if(err){
          console.log("error", err);
      } else {
          console.log("Connected successfully")
      }
  });
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use (cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/grocery', groceryRouter);

module.exports = app;
