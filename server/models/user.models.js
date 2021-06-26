const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			index: true,
			minlength: 3,
		},
		password: {
			type: String,
			required: false,
			unique: false,
			trim: false,
			index: false,
		},
	},
	{
		timestamps: false,
	}
);

const User = mongoose.model('User', userSchema);

module.exports = User;
