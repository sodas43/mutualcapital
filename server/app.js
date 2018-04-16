var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var cors = require('cors');
var index = require('./routes/index');
//var flash    = require('connect-flash');
var flash    = require('express-flash');
var crypto = require('crypto');
var async = require('async');
var expressValidator = require('express-validator');
//require('dotenv').config();

var passport = require('passport');
var session = require('express-session');

//var configDB = require('./auth/database');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI)
  .then(function(db) {
    console.log("Connected to database!!!");
  }, function(err) {
    console.log("Error in connecting database :: " + err);
  });

// *** routes *** //
//var routes = require('./routes/index.js');

var app = express();
//app.use(cors());
app.use(expressValidator());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

require('./auth/passport'); 

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});

app.use(express.static(path.join(__dirname, '../dist')));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// routes ======================================================================
var users = require('./routes/users');
app.use('/', users);

var categoryRoute = require('./routes/category');
app.use('/Category', categoryRoute);

var schemeRoute = require('./routes/scheme');
app.use('/Scheme', schemeRoute);
// app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
