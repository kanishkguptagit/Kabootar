import mongoose from 'mongoose';
import chalk from 'chalk';

function connectToDB(): void {
	console.log(chalk.white.bgYellow('attempting connection to database'));

	const uri = process.env.ATLAS_URI;
	if (!uri) {
		console.log(chalk.white.bgRedBright('MONGO ALTAS URI not found'));
		return;
	}

	mongoose.connect(uri, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	});

	mongoose.connection.once('open', () => {
		console.log(chalk.whiteBright.bgGreenBright('connection to database successful!'));
	});
}

connectToDB();
