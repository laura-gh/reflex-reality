require("dotenv").config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose");
const flash = require("connect-flash");
const helmet = require("helmet");
const compression = require("compression");

// For authentication
const User = require("./models/user");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();
app.use(helmet());
app.use(compression());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// express-session
app.use(session({
  secret: process.env.SECRET,
  saveUninitialized: false,
  resave: false,
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  })
}));

// passport configuration
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// flash messages
app.use(flash());

// mongoose connection setup
mongoose.connect(process.env.DB, { useNewUrlParser: true,  useUnifiedTopology: true, useCreateIndex: true });
mongoose.Promise = global.Promise;
mongoose.connection.on("error", (error) => console.error(error.message));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// local variables
app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.url = req.path;
  res.locals.flash = req.flash();
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
