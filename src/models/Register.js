const {model} = require('mongoose');
const validator = require('validator');

const Register = model('Register', {
	email: {
		type: String,
		lowercase: true,
		unique: true,
		required: 'Email address is required.',
		validate: [validator.isEmail, 'Please fill a valid email address.']
	},
	password: {
		type: String,
		minlength: 5,
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
});

const RegisterAdminOptions = {
	resource: Register, options: {
		parent: {name: 'Kullanıcı Bilgileri'},
		listProperties: ['email', 'name', 'surname', 'phone', 'createdAt'],
		showProperties: ['email', 'name', 'surname', 'phone', 'address', 'createdAt'],
		editProperties: ['email', 'name', 'surname', 'phone', 'address']
	}
};

module.exports = {
	Register,
	RegisterAdminOptions
};
