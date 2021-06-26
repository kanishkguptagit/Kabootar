import Agenda from 'agenda';
import chalk from 'chalk';
import mongoose from 'mongoose';

async function startAgenda() {
	console.log(chalk.white.bgYellow('starting scheduler'));

	const agenda = new Agenda({
		mongo: mongoose.connection.getClient().db(),
		db: {
			collection: 'scheduledJobs',
		} as any,
	});

	await agenda.start();
	console.log(chalk.whiteBright.bgGreen('agenda has started!'));
}

mongoose.connection.once('open', () => startAgenda());
