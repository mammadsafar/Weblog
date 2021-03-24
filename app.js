const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const config = require('./config/config');
const api = require('./routes/api');
// const usersRouter = require('./routes/users');
const mongoose = require('mongoose');
const session = require('express-session');
const app = express();



mongoose.connect(config.mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});




// // ? -----------< swagger >--------
// const {swaggerJsDoc} = require("swagger-jsdoc");
// const swaggerUi = require("swagger-ui-express");

// const swaggerOptions = {
//   swaggerDefinition: {
//     info: {
//       version: "1.0.0",
//       title: "Customer API",
//       description: "Customer API Information",
//       contact: {
//         name: "Amazing Developer"
//       },
//       servers: ["http://localhost:3000"]
//     }
//   },
//   // ['.routes/*.js']
//   apis: ["app.js"]
// };

// const swaggerDocs = swaggerJsDoc(swaggerOptions);
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
  key: 'user_sid',
  secret: config.secretKey,
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 600000
  }
}));
app.use((req, res, next) => {

  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie('user_sid')
  };
  next();
});



app.use('/', api);
// app.use('/users', usersRouter);

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
