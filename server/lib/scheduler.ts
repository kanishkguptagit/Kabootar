import Agenda from 'agenda';
import chalk from 'chalk';
import mongoose from 'mongoose';
import { IMail } from '../models/Mail.model';
import { sendMail } from './mailer';

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
			sendMail({ to: mail.recipents, subject: mail.subject, html: mail.body });
		});
	}

	public createScheduledEmail(when: Date | string, mail: IMail) {
		this.agenda.schedule(when, jobNames.sendScheduledMail, { mail });
	}
}
