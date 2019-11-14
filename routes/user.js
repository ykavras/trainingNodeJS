const express = require('express');
const router = express.Router();

// GET MODEL SCHEMA
const User = require('../models/User');
router.post('/register', function (req, res, next) {
	const user = new User(req.body);
	const promise = user.save();
	promise.then(data => {
		res.json(data);
	}).catch(err => {
		res.json(err)
	})
});

module.exports = router;
