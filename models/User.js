const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

const UserSchema = new Schema({
	userType: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		trim: true,
		lowercase: true,
		unique: true,
		required: 'Email address is required.',
		validate: [validator.isEmail, 'Please fill a valid email address.']
	},
	name: {
		type: String,
		minLength: 2,
		maxLength: 50,
		required: true,
	},
	surname: {
		type: String,
		minLength: 2,
		maxLength: 50,
		required: true,
	},
	phone: {
		type: String,
		unique: true,
		required: true,
	},
	address: {
		type: String,
		minLength: 10,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now()
	},
	updatedAt: {type: Date}
});
module.exports = mongoose.model('user', UserSchema);
