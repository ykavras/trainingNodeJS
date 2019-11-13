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
		type: Number,
		unique: true,
		required: 'Phone is required.',
		validate: [validator.isMobilePhone, 'Please fill a valid phone.']
	},
	address: {
		type: String,
		minLength: 10,
		required: true,
	},
	createdAt: new Date(),
	updatedAt: {type: Date}
});
module.exports = mongoose.model('user', UserSchema);
