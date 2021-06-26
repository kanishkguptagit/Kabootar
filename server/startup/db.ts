import mongoose from 'mongoose';
import chalk from 'chalk';
import Scheduler from '../lib/scheduler';

export default function connectToDB(): void {
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
	});

	mongoose.connection.once('open', () => {
		console.log(chalk.whiteBright.bgGreenBright('connection to database successful!'));
		// remove the following lines
		const scheduler = new Scheduler();
		const date = new Date();
		date.setSeconds(date.getSeconds() + 5);
		scheduler.createScheduledEmail(date, 'test user ' + Math.random() * 10 + ' id');
	});
}
