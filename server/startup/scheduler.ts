import Agenda from 'agenda';
import chalk from 'chalk';
import mongoose from 'mongoose';

export async function startAgenda() {
	console.log(chalk.white.bgYellow('starting scheduler'));

	const agenda = new Agenda({
		mongo: mongoose.connection.getClient().db(),
		// db: {
		// 	address: (mongoose.connection as any)._connectionString,
		// 	collection: 'scheduledJobs',
		// },
	});

	await agenda.start();
	console.log(chalk.whiteBright.bgGreen('agenda has started!'));
}
