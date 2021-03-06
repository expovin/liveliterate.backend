var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');

var app = express();

console.log("======= Starting LiveLiterate Backend Ver. 1.0.0 =============");


// CORS Management
var allowedOrigins = ['https://liveliterate.com',
                      'http://192.168.0.2:3001',
                      'http://localhost:3000',
                      'http://localhost:3001',
                      'http://localhost:3002',
                      'http://admin.liveliterate.com',
                      'https://admin.liveliterate.com',
                      'http://www.liveliterate.com',
                      'https://www.liveliterate.com',];


// Add headers
app.use(function (req, res, next) {

  console.log("Getting Origin : "+req.headers.origin);

  if(allowedOrigins.indexOf(req.headers.origin) != -1){

    console.log("Ogigin "+req.headers.origin+" Allowed")
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', '*');
    
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
  }
  else 
    console.log("Ogigin "+req.headers.origin+" NOT Allowed")




  // Pass to next layer of middleware
  next();
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
