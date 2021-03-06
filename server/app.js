var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

const cors = require('cors');
const stripe = require('stripe')('PRIVAT_KEY');

// Import module
const mongoose = require('mongoose');

var index = require('./routes/index');
var users = require('./routes/users');

const seeder = require('./routes/seed/products');
const products = require('./routes/products');
const categories = require('./routes/categories');

var app = express();

//Set up default mongoose connection
const mongoDB = 'mongodb://127.0.0.1/vueexpress';
mongoose.connect(mongoDB);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

app.use('/', index);
app.use('/users', users);

app.use('/seeder', seeder);
app.use('/products', products);
app.use('/categories', categories);

app.post('/charge', (req, res, next) => {
  let amount = req.body.total * 100;

  stripe.customers
    .create({
      email: req.body.stripeToken.email,
      source: req.body.stripeToken.id,
    })
    .then(customer => {
      stripe.charges.create({
        amount,
        description: 'e-Commerce Shopping Cart',
        currency: 'usd',
        customer: customer.id,
      });
    })
    .then(charge => {
      res.json(req.body.stripeToken);
    });
});

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
