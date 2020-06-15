const {model, Schema} = require('mongoose');

const Movie = model('Movie', {
	directorID: {
		type: Schema.Types.ObjectId,
		required: true,
	},
	categoryID: {
		type: Schema.Types.ObjectId,
		required: true,
	},
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

const MovieAdminOptions = {
	resource: Movie,
	options: {
		parent: {
			name: 'İşlemler'
		},
		listProperties: ['name', 'rating', 'duration', 'createdAt'],
		showProperties: ['coverURL', 'name', 'rating', 'duration', 'summary', 'createdAt'],
		editProperties: ['coverURL', 'name', 'rating', 'duration', 'summary', 'createdAt'],
	}
};

module.exports = {
	Movie,
	MovieAdminOptions
};
