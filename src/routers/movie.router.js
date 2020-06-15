const express = require('express');
const router = express.Router();

// GET MODEL SCHEMA
const MovieRouter = require('../models/Movie');

router.get('/', (req, res, next) => {
	const promise = MovieRouter.aggregate([
		{
			$lookup: {
				from: 'directors',
				localField: 'directorID',
				foreignField: '_id',
				as: 'director'
			}
		}, {$unwind: '$director'},
		{
			$lookup: {
				from: 'categories',
				localField: 'categoryID',
				foreignField: '_id',
				as: 'category'
			}
		}, {$unwind: '$category'},
	]);
	promise.then((data) => {
		res.json(data);
	}).catch((err) => {
		res.json(err);
	})
});

router.get('/:movie_id', (req, res, next) => {
	const promise = MovieRouter.findById(req.params.movie_id);

	promise.then((movie) => {
		if (!movie)
			next({message: 'The movie was not found.', code: 99});

		res.json(movie);
	}).catch((err) => {
		res.json(err);
	});
});

module.exports = router;
