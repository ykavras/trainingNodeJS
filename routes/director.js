const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// GET MODEL SCHEMA
const Director = require('../models/Director');

router.post('/', (req, res, next) => {
	const director = new Director(req.body);
	const promise = director.save();
	promise.then((data) => {
		res.json(data);
	}).catch((err) => {
		res.json(err);
	})
});

router.get('/', (req, res, next) => {
	const promise = Director.aggregate([
		{
			$lookup: {
				from: 'movies',
				localField: '_id',
				foreignField: 'directorID',
				as: 'movies'
			}
		},
		{
			$unwind: {
				path: '$movies',
				preserveNullAndEmptyArrays: true
			}
		},
		{
			$group: {
				_id: {
					_id: '$_id',
					name: '$name',
					surname: '$surname',
					bio: '$bio',
				},
				movies: {
					$push: '$movies'
				}
			}
		},
		{
			$project: {
				_id: '$_id._id',
				name: '$_id.name',
				surname: '$_id.surname',
				movies: '$movies'
			}
		}
	]);

	promise.then((data) => {
		res.json(data);
	}).catch((err) => {
		res.json(err);
	});
});

module.exports = router;
