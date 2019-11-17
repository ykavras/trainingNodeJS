const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const categoryRouter = require('./routes/category');
const movieRouter = require('./routes/movie');
const directorRouter = require('./routes/director');

const app = express();

// -- Mongoose Connect
mongoose.connect('mongodb://localhost:27017/TRAINING-NODE-JS-DB', {useUnifiedTopology: true, useNewUrlParser: true});

mongoose.connection.on('open', () => {
	console.log('MongoDb: Connected');
});
mongoose.connection.on('error', (err) => {
	console.log('MongoDb: Error', err);
});
// -- Mongoose Connect

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(sassMiddleware({
	src: path.join(__dirname, 'public'),
	dest: path.join(__dirname, 'public'),
	indentedSyntax: true, // true = .sass and false = .scss
	sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/category', categoryRouter);
app.use('/movie', movieRouter);
app.use('/director', directorRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
