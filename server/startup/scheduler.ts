import chalk from 'chalk';
import mongoose from 'mongoose';

import Scheduler from '../lib/scheduler';

async function startAgenda() {
	console.log(chalk.white.bgYellow('starting scheduler'));

	// once on startup so that pending emails will be sent
	new Scheduler();

	console.log(chalk.whiteBright.bgGreen('agenda has started!'));
}

mongoose.connection.once('open', () => startAgenda());
