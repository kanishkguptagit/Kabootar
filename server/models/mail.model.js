const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mailSchema = new Schema(
	{
		To: { type: String, required: true },
		CC: { type: String, required: false },
		Body: { type: String, required: true },
		// duration: { type: Number, required: true },
		Date: { type: Date, required: true }, //will this give time too
	},
	{
		timestamps: true,
	}
);

const Mail = mongoose.model('Exercise', mailSchema);

module.exports = Mail;
