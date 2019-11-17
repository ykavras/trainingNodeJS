const mongoose = require('mongoose');

module.exports = () => {
	mongoose.set('useCreateIndex', true);
	mongoose.connect('mongodb://localhost:27017/TRAINING-NODE-JS-DB', {useUnifiedTopology: true, useNewUrlParser: true});

	mongoose.connection.on('open', () => {
		console.log('MongoDb: Connected');
	});
	mongoose.connection.on('error', (err) => {
		console.log('MongoDb: Error', err);
	});

	mongoose.Promise = global.Promise;
};


