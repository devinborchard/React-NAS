var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');


/////////////////////////////////////////////////////init new pages
var indexRouter = require('./routes/index');
var uploadFileRouter = require('./routes/uploadFile');
var getFiles = require('./routes/getFiles');
var download = require('./routes/download');
var delete_ = require('./routes/delete');


//////////////////////////////////////////////////////
var app = express();

app.use(cors());

app.get('/products/:id', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
})


// view engine setup 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/////////////////////////////////////////////////////// use new pages
app.use('/', indexRouter);
app.use('/uploadFile', uploadFileRouter);
app.use('/getFiles', getFiles);
app.use('/download', download);
app.use('/delete', delete_);



///////////////////////////////////////////////////////
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
