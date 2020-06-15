const express = require('express');
const router = express.Router();

// GET MODEL SCHEMA
const CategoryRouter = require('../models/Category');

router.post('/', (req, res, next) => {
	const category = new CategoryRouter(req.body);
	const promise = category.save();
	promise.then(data => {
		res.json(data);
	}).catch(err => {
		res.json(err)
	})
});

router.get('/', (req, res, next) => {
	const promise = CategoryRouter.find({});
	promise.then(data => {
		res.json(data);
	}).catch((err) => {
		res.json(err)
	})
});

module.exports = router;
