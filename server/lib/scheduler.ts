import Agenda from 'agenda';
import chalk from 'chalk';
import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

import Mail, { IMail } from '../models/Mail.model';
import { sendMailToRecipents } from './mailer';

enum jobNames {
	sendScheduledMail = 'send-scheduled-mail',
	recurringMail = 'send-recurring-mail',
}
export default class Scheduler {
	private agenda: Agenda;
	constructor() {
		this.agenda = new Agenda({
			mongo: mongoose.connection.getClient().db() as any,
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

		this.agenda.define(jobNames.recurringMail, async (job: any) => {
			const { mail }: { mail: IMail } = job.attrs.data;
			console.log(chalk.white.bgBlueBright('sending a recurring mail to'), mail);
			sendMailToRecipents(mail);

			// update the scheduled of the mail to the last date
			await Mail.updateOne({ _id: mail._id }, { scheduled: new Date().toISOString() });
		});
	}

	public async createRecurringEmail(when: string, mail: IMail) {
		const newRecurringMail = this.agenda.create(jobNames.recurringMail, { mail });
		await newRecurringMail.repeatEvery(when).save();
	}

	public createScheduledEmail(when: Date | string, mail: IMail) {
		this.agenda.schedule(when, jobNames.sendScheduledMail, { mail });
	}

	public cancelRecurringOrScheduledMail(mailId: ObjectId) {
		return this.agenda.cancel({
			'data.mail._id': mailId,
		});
	}
}

export async function cancelMail(mailId: string): Promise<boolean> {
	if (!mailId) {
		return false;
	}

	const cancelledCount = await new Scheduler().cancelRecurringOrScheduledMail(
		new ObjectId(mailId)
	);

	await Mail.updateOne({ _id: new ObjectId(mailId) }, { isScheduled: false });

	if (cancelledCount) {
		console.log(chalk.redBright.bgWhite('cancelling scheduled/recurring for mailId'), mailId);
	}

	//@ts-ignore
	return cancelledCount && cancelledCount > 0 ? true : false;
}
