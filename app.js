const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');

const indexRouter = require('./src/routers/index.router');
const adminRouter = require('./src/routers/admin.router');
const categoryRouter = require('./src/routers/category.router');
const movieRouter = require('./src/routers/movie.router');
const directorRouter = require('./src/routers/director.router');

const app = express();

// db connection
const db = require('./src/helper/db.js')();

// Config
const config = require('./config');
app.set('api_secret_key', config.api_secret_key);

// Middleware
const verifyToken = require('./src/middleware/verify-token');

// view engine setup
app.set('views', path.join(__dirname, './src/views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
//app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(sassMiddleware({
	src: path.join(__dirname, 'public'),
	dest: path.join(__dirname, 'public'),
	indentedSyntax: true, // true = .sass and false = .scss
	sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', verifyToken);
app.use('/api/category', categoryRouter);
app.use('/api/movie', movieRouter);
app.use('/api/director', directorRouter);
app.use('/admin', adminRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
	next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
