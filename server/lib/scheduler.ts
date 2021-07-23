import Agenda from 'agenda';
import chalk from 'chalk';
import mongoose from 'mongoose';

import Mail, { IMail } from '../models/Mail.model';
import { sendMailToRecipents } from './mailer';

enum jobNames {
	sendScheduledMail = 'send-scheduled-mail',
}
export default class Scheduler {
	private agenda: Agenda;
	constructor() {
		this.agenda = new Agenda({
			mongo: mongoose.connection.getClient().db(),
			db: {
				collection: 'scheduledJobs',
			} as any,
		});
		this.init();
	}

	private init() {
		// start agenda timers
		this.agenda.start();
		// define jobnames so that agenda can dispatch that job
		this.agenda.define(jobNames.sendScheduledMail, async (job: any) => {
			const { mail }: { mail: IMail } = job.attrs.data;

			console.log(chalk.white.bgBlue('sending a scheduled mail to'), mail);
			sendMailToRecipents(mail);

			await Mail.updateOne({ _id: mail._id }, { isScheduled: false });
		});
	}

	public createScheduledEmail(when: Date | string, mail: IMail) {
		this.agenda.schedule(when, jobNames.sendScheduledMail, { mail });
	}
}
