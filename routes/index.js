const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', {title: 'Express'});
});

// GET MODELS SCHEMA
const User = require('../models/User');

router.post('/register', (req, res, next) => {
	const {email, password, name, surname, phone, address} = req.body;
	bcrypt.hash(password, 10).then((hash) => {
		const user = new User({
			email,
			password: hash,
			name,
			surname,
			phone,
			address,
		});

		const promise = user.save();
		promise.then((data) => {
			res.json(data)
		}).catch((err) => {
			res.json(err);
		})
	});
});

router.post('/authenticate', (req, res) => {
	const {email, password} = req.body;

	User.findOne({
		email
	}, (err, user) => {
		if (err)
			throw err;

		if (!user) {
			res.status(401).json({
				status: false,
				message: {
					email: 'Email not found.'
				}
			});
		} else {
			bcrypt.compare(password, user.password).then((result) => {
				if (!result) {
					res.status(401).json({
						status: false,
						message: {
							password: 'Wrong password.'
						}
					});
				} else {
					const payload = {
						email
					};
					const token = jwt.sign(payload, req.app.get('api_secret_key'), {
						expiresIn: 720 // 12 hour
					});

					res.status(200).json({token})
				}
			});
		}
	});
});
module.exports = router;
