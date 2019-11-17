const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
	directorID: Schema.Types.ObjectId,
	categoryID: Schema.Types.ObjectId,
	coverURL: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
		unique: true,
	},
	rating: {
		type: Number,
		required: true,
	},
	releaseDate: {
		type: Date,
		required: true,
	},
	duration: {
		type: Number,
		required: true,
	},
	summary: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now()
	},
});
module.exports = mongoose.model('movie', MovieSchema);
