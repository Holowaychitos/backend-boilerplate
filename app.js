const express = require('express')
const path = require('path')
const logger = require('morgan')
const bodyParser = require('body-parser')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

registerRoute('/', './routes/index')
registerRoute('/users', './routes/users/index')
registerRoute('/users/new', './middleware/teapot', './routes/users/new')

// function to register routes
function registerRoute (path, ...middlewares) {
  middlewares = middlewares.map((value) => {
    let router = express.Router()
    require(value)(router)
    return router
  })
  app.use(path, ...middlewares)
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.json({
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.json({
    message: err.message,
    error: {}
  })
})

module.exports = app
